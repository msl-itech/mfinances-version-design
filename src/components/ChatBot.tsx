import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`;

const WELCOME_MESSAGE: Msg = {
  role: "assistant",
  content:
    "Bonjour ! 👋 Je suis l'assistant MFinances. Comment puis-je vous aider ? Posez-moi une question sur nos services, tarifs ou ressources.",
};

const MAX_MESSAGES_PER_SESSION = 10;
const LEAD_CAPTURE_AFTER = 3;
const PROACTIVE_DELAY_MS = 30_000;

// ── Invisible Lead Scoring ──
const SCORE_THRESHOLD_HOT = 7; // Switch CTA to diagnostic
const SCORE_KEYWORDS: { regex: RegExp; points: number }[] = [
  // Urgence (+4)
  { regex: /\b(urgent|rapidement|vite|pressé|deadline|dès que possible|asap|au plus vite|tout de suite)\b/i, points: 4 },
  // Budget / prix mentionné (+3)
  { regex: /\b(budget|prix|coût|tarif|combien|devis|factur|investir|investissement|€|euros?)\b/i, points: 3 },
  // Taille entreprise / CA (+2)
  { regex: /\b(salarié|employé|équipe|chiffre d'affaires|CA|revenus?|bénéfice|croissance|clients?|personnel)\b/i, points: 2 },
  // Recherche active de comptable (+3)
  { regex: /\b(cherch|besoin d'un comptable|changer de comptable|nouveau comptable|accompagnement|mission)\b/i, points: 3 },
  // Structure juridique (+2)
  { regex: /\b(SRL|SA|SPRL|ASBL|société|indépendant|complémentaire|personne physique|management)\b/i, points: 2 },
  // Problème fiscal / contrôle (+3)
  { regex: /\b(contrôle fiscal|redressement|amende|TVA|ISOC|IPP|déclaration|retard|problème)\b/i, points: 3 },
];

// ── Profanity / abuse filter (client-side, saves tokens) ──
const PROFANITY_PATTERNS = [
  /\b(putain|merde|connard|connasse|enculé|fdp|ntm|nique|salaud|salope|bordel|batard|bâtard|pd|pute|cul|bite|chier|foutre|enfoiré|abruti|crétin|débile|imbécile|con\b)/i,
  /\b(fuck|shit|bitch|asshole|dick|bastard|damn|crap|idiot|stupid|dumb)\b/i,
];

const VALID_INTERNAL_ROUTES = new Set([
  "/", "/tarifs/", "/services/", "/services/daf-externalise/", "/services/controle-de-gestion/",
  "/services/tresorerie/", "/services/comptabilite/", "/services/fiscalite/",
  "/services/creation-entreprise/", "/qui-nous-accompagnons/",
  "/qui-nous-accompagnons/independants-et-startups/", "/qui-nous-accompagnons/commerce-et-horeca/",
  "/qui-nous-accompagnons/professions-de-sante/", "/qui-nous-accompagnons/entreprises-en-croissance/",
  "/qui-nous-accompagnons/promoteurs-immobiliers/", "/qui-nous-accompagnons/asbl/",
  "/qui-nous-accompagnons/societe-exploitation/", "/qui-nous-accompagnons/societe-de-management/",
  "/qui-nous-accompagnons/societe-de-moyens/", "/diagnostic/", "/checklist-tresorerie/",
  "/ressources/calculateur-bureau/", "/ressources/generateur-bail/",
  "/ressources/checklist-controle-bureau/", "/frais-defendables/", "/blog/", "/a-propos/",
  "/contact/", "/support/",
]);

const isProfane = (text: string) => PROFANITY_PATTERNS.some((p) => p.test(text));

// Sanitize AI response: replace any internal links not in whitelist
const sanitizeLinks = (text: string): string => {
  return text.replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, (match, label, url) => {
    const normalized = url.endsWith("/") ? url : url + "/";
    if (VALID_INTERNAL_ROUTES.has(normalized)) return match;
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

// ── Proactive messages based on page ──
const PROACTIVE_MESSAGES: Record<string, string> = {
  "/": "💡 Besoin d'un expert-comptable qui pilote vraiment vos finances ?",
  "/tarifs/": "🤔 Besoin d'aide pour choisir le bon forfait ?",
  "/services/": "👋 Un question sur nos services ? Je peux vous guider !",
  "/services/daf-externalise/": "📊 Le DAF externalisé vous intéresse ? Posez-moi vos questions !",
  "/qui-nous-accompagnons/": "🎯 Vous cherchez un accompagnement sur-mesure ?",
  "/blog/": "📚 Besoin d'un conseil sur un sujet précis ?",
  "/contact/": "📞 Je peux répondre à vos questions avant votre prise de contact !",
};

const DEFAULT_PROACTIVE = "💬 Une question ? Je suis là pour vous aider !";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [showProactive, setShowProactive] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadScore, setLeadScore] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const limitReached = userMsgCount >= MAX_MESSAGES_PER_SESSION;
  const isHotLead = leadScore >= SCORE_THRESHOLD_HOT;

  // Score a message against keyword patterns (each pattern scores only once per session)
  const scoredPatternsRef = useRef<Set<number>>(new Set());
  const scoreMessage = useCallback((text: string) => {
    let added = 0;
    SCORE_KEYWORDS.forEach((kw, idx) => {
      if (!scoredPatternsRef.current.has(idx) && kw.regex.test(text)) {
        scoredPatternsRef.current.add(idx);
        added += kw.points;
      }
    });
    if (added > 0) setLeadScore((prev) => prev + added);
  }, []);

  // Get suggestions for current page
  const currentPath = location.pathname;
  const suggestions =
    PAGE_SUGGESTIONS[currentPath] ||
    Object.entries(PAGE_SUGGESTIONS).find(([key]) => currentPath.startsWith(key) && key !== "/")?.[1] ||
    DEFAULT_SUGGESTIONS;

  // Proactive message after 30s
  useEffect(() => {
    if (open || proactiveDismissed) return;
    const timer = setTimeout(() => setShowProactive(true), PROACTIVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [open, proactiveDismissed, currentPath]);

  // Hide proactive when chat opens
  useEffect(() => {
    if (open) setShowProactive(false);
  }, [open]);

  // Reset proactive on page change
  useEffect(() => {
    setShowProactive(false);
    setProactiveDismissed(false);
    const timer = setTimeout(() => {
      if (!open) setShowProactive(true);
    }, PROACTIVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [currentPath]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Check if we should show lead capture
  useEffect(() => {
    if (userMsgCount === LEAD_CAPTURE_AFTER && !leadSubmitted && !showLeadCapture) {
      setShowLeadCapture(true);
    }
  }, [userMsgCount, leadSubmitted, showLeadCapture]);

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

      const userMsg: Msg = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      let assistantSoFar = "";

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: newMessages.filter((m) => m !== WELCOME_MESSAGE),
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
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant" && last !== WELCOME_MESSAGE) {
                    return prev.map((m, i) =>
                      i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                    );
                  }
                  return [...prev, { role: "assistant", content: assistantSoFar }];
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

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = leadEmail.trim();
    if (!email) return;

    // Send to chatbot as context + close lead capture
    setLeadSubmitted(true);
    setShowLeadCapture(false);

    // Add as a system-like message
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Merci ! 📩 Nous vous recontacterons à **${email}** dans les plus brefs délais. En attendant, n'hésitez pas à [prendre rendez-vous directement](/diagnostic/).`,
      },
    ]);

    // Send lead email to chatbot edge function for logging
    fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          ...messages.filter((m) => m !== WELCOME_MESSAGE),
          {
            role: "user",
            content: `[LEAD CAPTURE] L'utilisateur souhaite être recontacté à : ${email}. Page visitée : ${currentPath}`,
          },
        ],
      }),
    }).catch(() => {});
  };

  // Don't show on diagnostic page (form page)
  if (location.pathname === "/diagnostic/") return null;

  const proactiveMessage =
    PROACTIVE_MESSAGES[currentPath] ||
    Object.entries(PROACTIVE_MESSAGES).find(([key]) => currentPath.startsWith(key) && key !== "/")?.[1] ||
    DEFAULT_PROACTIVE;

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
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground text-[10px]"
            >
              ✕
            </button>
            <p className="text-[13px] text-foreground leading-snug">{proactiveMessage}</p>
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
                Assistant MFinances
              </h3>
              <p className="text-primary-foreground/50 text-[11px]">
                Répond en quelques secondes
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
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-accent underline underline-offset-2 hover:no-underline font-medium"
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {children}
                        </a>
                      ),
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
                  Laissez votre email et notre équipe vous rappelle sous 24h.
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
                    className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-[12px] font-medium hover:brightness-105 transition-all"
                  >
                    Envoyer
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

          {/* Hot lead CTA banner */}
          {isHotLead && !limitReached && (
            <div className="border-t border-accent/20 bg-accent/5 px-4 py-2.5 animate-fade-in">
              <a
                href="/diagnostic/"
                className="flex items-center justify-center gap-2 text-[13px] font-bold text-accent hover:underline"
              >
                🔥 Réservez votre diagnostic gratuit (30 min) →
              </a>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3">
            {limitReached ? (
              <div className="text-center py-2">
                <p className="text-[12px] text-muted-foreground mb-2">
                  Vous avez atteint la limite de {MAX_MESSAGES_PER_SESSION} messages.
                </p>
                <a
                  href={isHotLead ? "/diagnostic/" : "/contact/"}
                  className="text-[13px] text-accent font-medium underline underline-offset-2"
                >
                  {isHotLead
                    ? "Réservez votre diagnostic gratuit →"
                    : "Contactez-nous directement →"}
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
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 hover:brightness-105 transition-all"
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
