import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Mail, CalendarCheck, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { submitLead } from "@/lib/odoo-submit";
import { getMFContext, type MFContext } from "@/lib/visitor-tracker";
import { trackChatbotEvent, getSessionId, type ChatbotEventType } from "@/lib/chatbot-analytics";
import { BOOKING_URL } from "@/lib/appointment";
import { buildUtmQuery } from "@/lib/utm-enrich";
import {
  ALLOWED_BLOG_PATHS,
  BLOG_CATEGORY_CHAT,
  classifyChatLink,
  getBlogCategorySlug,
  getPageGuide,
  type ChatLinkKind,
} from "@/lib/chatbot-page-context";

// Lien de rendez-vous avec la provenance « chatbot » pour la retrouver dans Odoo.
function chatBookingUrl(): string {
  try {
    const url = new URL(buildUtmQuery(BOOKING_URL));
    url.searchParams.set("utm_content", "chatbot");
    return url.toString();
  } catch {
    return BOOKING_URL;
  }
}

const LINK_EVENTS: Partial<Record<ChatLinkKind, ChatbotEventType>> = {
  booking: "booking_click",
  article: "article_click",
  diagnostic: "diagnostic_click",
  guide: "guide_click",
  contact: "contact_click",
};
import { trackEvent, tagCtaContext } from "@/lib/clarity-events";
import { INTEREST_KEYWORDS, anyTermMatches } from "../../supabase/functions/_shared/chatbot-guard";
import {
  DEFAULT_PROACTIVE,
  EXIT_MESSAGES,
  LEAD_CARD_TEXT,
  PRIVACY_NOTICE,
  PROACTIVE_MESSAGES,
  WELCOME_TEXT,
  escapeHtml,
  leadFailureText,
  leadSuccessText,
} from "@/lib/chatbot-copy";

// ── Palier helper (mirrors Edge Function logic) ──
function getPalierFromScore(totalScore: number): "froid" | "tiede" | "chaud" {
  if (totalScore >= 12) return "chaud";
  if (totalScore >= 5) return "tiede";
  return "froid";
}

// Build pre-filled diagnostic URL with collected data
function buildDiagnosticURL(ctx: MFContext, email?: string): string {
  const params = new URLSearchParams();
  if (ctx.prenom) params.set("prenom", ctx.prenom);
  if (email) params.set("email", email);
  if (ctx.sector) params.set("secteur", ctx.sector);
  const totalScore = ctx.behaviorScore || 0;
  if (totalScore > 0) params.set("score", String(totalScore));
  const qs = params.toString();
  return `/diagnostic/${qs ? "?" + qs : ""}`;
}

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`;

const WELCOME_MESSAGE: Msg = {
  role: "assistant",
  content: WELCOME_TEXT,
};

// Même limite pour tous : un visiteur engagé ne doit pas être coupé avant un visiteur froid.
// Le serveur garde ses propres limites (8 messages/minute, 80/jour par adresse).
const MAX_MESSAGES = 15;
const LEAD_CAPTURE_AFTER = 3;
const PROACTIVE_DELAY_MS = 30_000;

// ── Invisible Lead Scoring ──
const SCORE_THRESHOLD_HOT = 7; // Switch CTA to diagnostic
// ── Profanity / abuse filter (client-side, saves tokens) ──
const PROFANITY_TERMS = [
  "putain", "merde", "connard", "connasse", "enculé", "fdp", "ntm", "nique", "salaud", "salope", "bordel", "batard", "bâtard",
  "pd", "pute", "cul", "bite", "chier", "foutre", "enfoiré", "abruti", "crétin", "débile", "imbécile", "con",
  "fuck", "shit", "bitch", "asshole", "dick", "bastard", "damn", "crap", "idiot", "stupid", "dumb",
];

const VALID_INTERNAL_ROUTES = new Set([
  "/", "/tarifs/", "/services/", "/services/daf-externalise/", "/services/controle-de-gestion/",
  "/services/tresorerie/", "/services/comptabilite/", "/services/fiscalite/",
  "/services/creation-entreprise/", "/qui-nous-accompagnons/", "/societe-en-veille/",
  "/qui-nous-accompagnons/independants-et-startups/", "/qui-nous-accompagnons/commerce-et-horeca/",
  "/qui-nous-accompagnons/professions-de-sante/", "/qui-nous-accompagnons/entreprises-en-croissance/",
  "/qui-nous-accompagnons/promoteurs-immobiliers/", "/qui-nous-accompagnons/asbl/",
  "/qui-nous-accompagnons/societe-exploitation/", "/qui-nous-accompagnons/societe-de-management/",
  "/qui-nous-accompagnons/societe-de-moyens/", "/newsroom/", "/diagnostic/", "/checklist-tresorerie/",
  "/ressources/calculateur-bureau/", "/ressources/generateur-bail/",
  "/ressources/checklist-controle-bureau/", "/frais-defendables/", "/blog/", "/a-propos/",
  "/contact/", "/support/",
]);

const isProfane = (text: string) => anyTermMatches(text, PROFANITY_TERMS);

// Sanitize AI response: replace any internal links not in whitelist
const sanitizeLinks = (text: string): string => {
  return text.replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, (match, label, url) => {
    const path = url.split(/[?#]/)[0];
    const normalized = path.endsWith("/") ? path : path + "/";
    if (VALID_INTERNAL_ROUTES.has(normalized) || ALLOWED_BLOG_PATHS.has(normalized)) return match;
    // Replace invalid link with contact page
    return `[${label}](/contact/)`;
  });
};

// ── Contextual suggestions based on current page ──
const PAGE_SUGGESTIONS: Record<string, string[]> = {
  "/": [
    "Quel forfait me convient ?",
    "Je veux un diagnostic gratuit",
    "Quels profils accompagnez-vous ?",
  ],
  "/tarifs/": [
    "Quelle différence entre Premium et Excellence ?",
    "Y a-t-il une réduction pour les ASBL ?",
    "Que comprend le forfait Essentiel ?",
  ],
  "/societe-en-veille/": [
    "Que comprend le forfait société en veille ?",
    "Je suis en veille, quel est mon tarif ?",
    "Est-ce que la TVA est incluse ?",
  ],
  "/services/": [
    "C'est quoi un DAF externalisé ?",
    "Comment fonctionne le contrôle de gestion ?",
    "Aidez-vous à créer une entreprise ?",
  ],
  "/services/daf-externalise/": [
    "Combien coûte le DAF externalisé ?",
    "C'est pour quel type d'entreprise ?",
    "Quelle est la fréquence des rendez-vous ?",
  ],
  "/services/comptabilite/": [
    "Vous utilisez quel logiciel ?",
    "Comment se passe la transition ?",
    "Quels sont vos délais ?",
  ],
  "/services/fiscalite/": [
    "C'est quoi le VVPRbis ?",
    "Comment optimiser mon ISOC ?",
    "Réserve de liquidation, c'est quoi ?",
  ],
  "/services/creation-entreprise/": [
    "Combien coûte la création ?",
    "Quelles étapes pour créer une SRL ?",
    "Aidez-vous pour le plan financier ?",
  ],
  "/qui-nous-accompagnons/": [
    "Je suis médecin, que proposez-vous ?",
    "J'ai un commerce, quel forfait ?",
    "Je suis en croissance, par où commencer ?",
  ],
  "/newsroom/": [
    "Qu'est-ce que Finance Connectée ?",
    "Qui est Mika Musungayi ?",
    "MFINANCES fait du pilotage financier ?",
  ],
  "/blog/": [
    "Un article sur le BFR ?",
    "Comment gérer ma trésorerie ?",
    "Bureau à domicile, quels frais ?",
  ],
  "/contact/": [
    "Quels sont vos horaires ?",
    "Où se trouve votre cabinet ?",
    "Comment prendre rendez-vous ?",
  ],
};

const DEFAULT_SUGGESTIONS = [
  "Quels sont vos services ?",
  "Je veux un diagnostic gratuit",
  "Combien ça coûte ?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [showProactive, setShowProactive] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);
  const [proactiveText, setProactiveText] = useState("");
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSending, setLeadSending] = useState(false);
  const [leadScore, setLeadScore] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const sessionLimit = MAX_MESSAGES;
  const limitReached = userMsgCount >= sessionLimit;

  // Score a message against keyword patterns (each pattern scores only once per session)
  const scoredPatternsRef = useRef<Set<number>>(new Set());
  const scoreMessage = useCallback((text: string) => {
    let added = 0;
    INTEREST_KEYWORDS.forEach((kw, idx) => {
      if (!scoredPatternsRef.current.has(idx) && anyTermMatches(text, kw.terms)) {
        scoredPatternsRef.current.add(idx);
        added += kw.points;
      }
    });
    if (added !== 0) setLeadScore((prev) => Math.max(0, prev + added));
  }, []);

  // Get suggestions for current page
  const currentPath = location.pathname;
  const blogCategory = getBlogCategorySlug(currentPath);
  const pageGuide = getPageGuide(currentPath);
  const suggestions =
    (blogCategory ? BLOG_CATEGORY_CHAT[blogCategory].suggestions : null) ||
    PAGE_SUGGESTIONS[currentPath] ||
    Object.entries(PAGE_SUGGESTIONS).find(([key]) => currentPath.startsWith(key) && key !== "/")?.[1] ||
    DEFAULT_SUGGESTIONS;

  // Proactive message after 30s
  const getProactiveForPage = useCallback((path: string) => {
    const cat = getBlogCategorySlug(path);
    if (cat) return BLOG_CATEGORY_CHAT[cat].proactive;
    return PROACTIVE_MESSAGES[path] ||
      Object.entries(PROACTIVE_MESSAGES).find(([key]) => path.startsWith(key) && key !== "/")?.[1] ||
      DEFAULT_PROACTIVE;
  }, []);

  useEffect(() => {
    if (open || proactiveDismissed) return;
    const timer = setTimeout(() => {
      const msg = getProactiveForPage(currentPath);
      if (msg) {
        setProactiveText(msg);
        setShowProactive(true);
      }
    }, PROACTIVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [open, proactiveDismissed, currentPath, getProactiveForPage]);

  // Auto-dismiss proactive bubble after 10s
  useEffect(() => {
    if (!showProactive) return;
    const timer = setTimeout(() => {
      setShowProactive(false);
      setProactiveDismissed(true);
    }, 10_000);
    return () => clearTimeout(timer);
  }, [showProactive]);

  // Hide proactive when chat opens
  useEffect(() => {
    if (open) setShowProactive(false);
  }, [open]);

  // Reset proactive on page change
  useEffect(() => {
    setShowProactive(false);
    setProactiveDismissed(false);
  }, [currentPath]);

  // Message de sortie : souris qui quitte la page (ordinateur) ;
  // sur écran tactile, remontée rapide de la page ou 60 % de lecture d'un article.
  useEffect(() => {
    if (open) return;
    const exitMsgFor = (path: string) =>
      EXIT_MESSAGES[path] ||
      Object.entries(EXIT_MESSAGES).find(([key]) => path.startsWith(key) && key !== "default")?.[1] ||
      EXIT_MESSAGES.default;
    const show = (msg: string) => {
      if (!msg || sessionStorage.getItem("mf_exit_shown")) return;
      sessionStorage.setItem("mf_exit_shown", "1");
      setProactiveText(msg);
      setShowProactive(true);
      setProactiveDismissed(false);
    };

    const isTouch = window.matchMedia?.("(hover: none)").matches;
    if (!isTouch) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY > 50) return; // only trigger when leaving from top
        show(exitMsgFor(currentPath));
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }

    const isArticle = /^\/blog\/[^/]+\/[^/]+\/?$/.test(currentPath);
    const cat = getBlogCategorySlug(currentPath);
    let maxDepth = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    const handleScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? y / scrollable : 0;
      maxDepth = Math.max(maxDepth, depth);
      if (isArticle && cat && depth >= 0.6) {
        show(BLOG_CATEGORY_CHAT[cat].proactive);
      } else if (maxDepth >= 0.4 && lastY - y > 250 && t - lastT < 350) {
        show(exitMsgFor(currentPath));
      }
      if (t - lastT > 350 || y > lastY) {
        lastY = y;
        lastT = t;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, currentPath]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    // Track open/close events (skip initial mount)
    if (open) {
      trackChatbotEvent("opened");
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      trackChatbotEvent("closed");
      wasOpenRef.current = false;
    }
  }, [open]);

  // Check if we should show lead capture — adaptive per palier
  useEffect(() => {
    if (leadSubmitted || showLeadCapture) return;
    const ctx = getMFContext();
    const palier = getPalierFromScore(ctx.behaviorScore + leadScore);
    const threshold =
      palier === "chaud" ? 1 : palier === "tiede" ? 2 : LEAD_CAPTURE_AFTER;
    if (userMsgCount >= threshold) {
      setShowLeadCapture(true);
    }
  }, [userMsgCount, leadSubmitted, showLeadCapture, leadScore]);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    // Auto-send
    setTimeout(() => {
      setInput(text);
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      sendMessageWithText(text);
    }, 50);
  };

  const sendMessageWithText = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || limitReached) return;

      // ── Profanity filter (blocks before API call = saves tokens) ──
      if (isProfane(text.trim())) {
        const userMsg: Msg = { role: "user", content: text.trim() };
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            role: "assistant",
            content:
              "Je reste à votre disposition pour toute question professionnelle concernant nos services. Comment puis-je vous aider ?",
          },
        ]);
        setUserMsgCount((c) => c + 1);
        setInput("");
        return;
      }

      scoreMessage(text.trim());
      setUserMsgCount((c) => c + 1);
      trackChatbotEvent("message_sent");
      const userMsg: Msg = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      let assistantSoFar = "";

      try {
        const visitorContext = getMFContext();
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: newMessages.filter((m) => m !== WELCOME_MESSAGE),
            context: visitorContext,
            pagePath: window.location.pathname,
            sessionId: getSessionId(),
            pageGuide: getPageGuide(window.location.pathname),
          }),
        });

        if (!resp.ok || !resp.body) throw new Error("Erreur réseau");

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let streamDone = false;

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") {
              streamDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantSoFar += content;
                const sanitized = sanitizeLinks(assistantSoFar);
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant" && last !== WELCOME_MESSAGE) {
                    return prev.map((m, i) =>
                      i === prev.length - 1 ? { ...m, content: sanitized } : m
                    );
                  }
                  return [...prev, { role: "assistant", content: sanitized }];
                });
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      } catch (e) {
        console.error("Chat error:", e);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter au [+32 2 886 05 50](/contact/).",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, limitReached]
  );

  const sendMessage = useCallback(() => {
    sendMessageWithText(input);
  }, [input, sendMessageWithText]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = leadEmail.trim();
    if (!email || leadSending) return;
    setLeadSending(true);

    // Build conversation summary for Odoo description (texte libre : échappé)
    const conversationSummary = messages
      .filter((m) => m !== WELCOME_MESSAGE)
      .map((m) => `${m.role === "user" ? "Visiteur" : "Bot"}: ${m.content}`)
      .slice(-6)
      .join("\n");

    const visitorCtx = getMFContext();
    const palier = getPalierFromScore(visitorCtx.behaviorScore + leadScore);
    const priorite = palier === "chaud" ? "HAUTE" : palier === "tiede" ? "MOYENNE" : "BASSE";
    const outils = [
      visitorCtx.diagnosticDone ? "diagnostic" : null,
      visitorCtx.checklistDownloaded ? "checklist" : null,
    ].filter(Boolean).join(", ");
    const e2 = escapeHtml;

    tagCtaContext("chatbot");
    const result = await submitLead({
      name: visitorCtx.prenom || email.split("@")[0],
      email_from: email,
      description: [
        `<h3>Lead Chatbot : priorité ${priorite}</h3>`,
        `<table style="border-collapse:collapse;width:100%">`,
        `<tr><td><strong>Palier</strong></td><td>${palier.toUpperCase()}</td></tr>`,
        `<tr><td><strong>Score total</strong></td><td>${visitorCtx.behaviorScore + leadScore} (comportemental: ${visitorCtx.behaviorScore} | conversationnel: ${leadScore})</td></tr>`,
        `<tr><td><strong>E-mail</strong></td><td>${e2(email)}</td></tr>`,
        `<tr><td><strong>Secteur</strong></td><td>${e2(visitorCtx.sector || "non identifié")}</td></tr>`,
        `<tr><td><strong>Pages vues</strong></td><td>${e2(visitorCtx.pages.join(", "))}</td></tr>`,
        `<tr><td><strong>Visite n°</strong></td><td>${Number(visitorCtx.visitCount) || 1} | Temps : ${Math.floor((Number(visitorCtx.timeSeconds) || 0) / 60)} min</td></tr>`,
        `<tr><td><strong>Source</strong></td><td>${e2(visitorCtx.source)}${visitorCtx.utmCampaign ? ` (${e2(visitorCtx.utmCampaign)})` : ""}</td></tr>`,
        `<tr><td><strong>Outils</strong></td><td>${outils || "aucun"}</td></tr>`,
        `<tr><td><strong>Messages</strong></td><td>${userMsgCount}</td></tr>`,
        `</table>`,
        `<hr/>`,
        `<p><strong>Résumé conversation :</strong></p>`,
        `<pre>${e2(conversationSummary)}</pre>`,
      ].join(""),
    }).catch(() => ({ success: true as const, message: "fallback" as const }));

    setLeadSending(false);
    setShowLeadCapture(false);
    setLeadSubmitted(true);

    if (result.message === "ok") {
      trackEvent("contact_form_submit");
      trackChatbotEvent("lead_submitted");
      setMessages((prev) => [...prev, { role: "assistant", content: leadSuccessText(email, chatBookingUrl()) }]);
    } else {
      // Envoi impossible : on ne promet pas de rappel, on donne le téléphone et le rendez-vous.
      setMessages((prev) => [...prev, { role: "assistant", content: leadFailureText(chatBookingUrl()) }]);
    }
  };

  // Don't show on diagnostic page (form page)
  if (location.pathname === "/diagnostic/") return null;

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* Proactive tooltip */}
      {showProactive && !open && (
        <div className="fixed bottom-20 md:bottom-6 right-20 z-50 animate-fade-in">
          <div
            className="bg-card rounded-2xl shadow-xl border border-border px-4 py-3 max-w-[220px] cursor-pointer relative"
            onClick={() => {
              setOpen(true);
              setShowProactive(false);
              setProactiveDismissed(true);
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProactive(false);
                setProactiveDismissed(true);
              }}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground text-[13px]"
              aria-label="Fermer"
            >
              ✕
            </button>
            <p className="text-[13px] text-foreground leading-snug">{proactiveText}</p>
            {/* Triangle pointer */}
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-card" />
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setShowProactive(false);
          setProactiveDismissed(true);
        }}
        className={cn(
          "fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105",
          open
            ? "bg-muted text-muted-foreground"
            : "bg-accent text-accent-foreground hover:shadow-[0_6px_24px_rgba(232,57,58,0.3)]",
          showProactive && !open && "animate-bounce"
        )}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 origin-bottom-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none",
          "bottom-36 md:bottom-24 right-4 w-[calc(100vw-2rem)] sm:w-[380px]"
        )}
      >
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[70vh] md:max-h-[500px]">
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
              <MessageCircle size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="text-primary-foreground text-sm font-bold font-body">
                Assistant IA MFinances
              </h3>
              <p className="text-primary-foreground/70 text-[11px]">
                Informations générales, pas un conseil personnalisé
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                  msg.role === "user"
                    ? "bg-accent text-accent-foreground ml-auto rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown
                    components={{
                      a: ({ href, children }) => {
                        const kind = classifyChatLink(href ?? "");
                        const finalHref = kind === "booking" ? chatBookingUrl() : href;
                        const external = finalHref?.startsWith("http");
                        return (
                          <a
                            href={finalHref}
                            onClick={() => {
                              const ev = LINK_EVENTS[kind];
                              if (ev) trackChatbotEvent(ev);
                            }}
                            className="text-accent underline underline-offset-2 hover:no-underline font-medium"
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                          >
                            {children}
                          </a>
                        );
                      },
                      p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            ))}

            {/* Quick suggestions */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
                {pageGuide && (
                  <a
                    href={pageGuide.href}
                    onClick={() => trackChatbotEvent("guide_click")}
                    className="w-full flex items-center gap-2 text-[12px] px-3 py-2 rounded-2xl bg-primary/5 border border-primary/15 text-primary font-medium hover:bg-primary/10 transition-colors"
                  >
                    <BookOpen size={14} aria-hidden="true" className="flex-shrink-0" />
                    <span>Gratuit : {pageGuide.label}</span>
                  </a>
                )}
              </div>
            )}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 w-fit">
                <Loader2 size={16} className="animate-spin text-muted-foreground" />
              </div>
            )}

            {/* Lead capture card */}
            {showLeadCapture && !leadSubmitted && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-accent" />
                  <p className="text-[13px] font-bold text-foreground">
                    Souhaitez-vous être recontacté ?
                  </p>
                </div>
                <p className="text-[12px] text-muted-foreground mb-3">
                  {LEAD_CARD_TEXT}
                </p>
                <form onSubmit={handleLeadSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="flex-1 bg-background rounded-full px-3 py-2 text-[12px] border border-border outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <button
                    type="submit"
                    disabled={leadSending}
                    className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-[12px] font-medium hover:brightness-105 transition-all disabled:opacity-60"
                  >
                    {leadSending ? "Envoi…" : "Envoyer"}
                  </button>
                </form>
                <button
                  onClick={() => setShowLeadCapture(false)}
                  className="text-[11px] text-muted-foreground/60 mt-2 hover:text-muted-foreground"
                >
                  Non merci, continuer le chat
                </button>
              </div>
            )}
          </div>

          {/* Rendez-vous : visible dès la première réponse */}
          {userMsgCount >= 1 && !limitReached && (
            <div className="border-t border-border px-3 py-2.5 flex items-center gap-2 animate-fade-in" data-cta-location="chatbot">
              <a
                href={chatBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackChatbotEvent("booking_click")}
                className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-full bg-accent text-accent-foreground text-[12.5px] font-bold px-3 hover:brightness-105 transition-all"
              >
                <CalendarCheck size={15} aria-hidden="true" />
                Réserver un appel
              </a>
              <a
                href={buildDiagnosticURL(getMFContext())}
                onClick={() => trackChatbotEvent("diagnostic_click")}
                className="min-h-[40px] inline-flex items-center justify-center rounded-full border border-primary text-primary text-[12px] font-medium px-3 hover:bg-primary/5 transition-colors"
              >
                Diagnostic gratuit
              </a>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3">
            {limitReached ? (
              <div className="text-center py-2">
                <p className="text-[12px] text-muted-foreground mb-2">
                  Vous avez atteint la limite de {sessionLimit} messages.
                </p>
                <a
                  href={chatBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackChatbotEvent("booking_click")}
                  data-cta-location="chatbot"
                  className="text-[13px] text-accent font-medium underline underline-offset-2"
                >
                  Réservez un appel avec Mika →
                </a>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-accent/30 text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  aria-label="Envoyer le message"
                  title="Envoyer le message"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 hover:brightness-105 transition-all"
                >
                  <Send size={15} aria-hidden="true" />
                  <span className="sr-only">Envoyer</span>
                </button>
              </form>
            )}
            {!limitReached && (
              <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{PRIVACY_NOTICE}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
