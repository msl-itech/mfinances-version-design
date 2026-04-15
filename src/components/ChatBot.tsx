import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const limitReached = userMsgCount >= MAX_MESSAGES_PER_SESSION;

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

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
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

      if (!resp.ok || !resp.body) {
        throw new Error("Erreur réseau");
      }

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
          content: "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter au [+32 2 886 05 50](/contact/).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  // Don't show on diagnostic page (form page)
  if (location.pathname === "/diagnostic/") return null;

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105",
          open
            ? "bg-muted text-muted-foreground"
            : "bg-accent text-accent-foreground hover:shadow-[0_6px_24px_rgba(232,57,58,0.3)]"
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
          // Mobile: full width minus margin. Desktop: fixed width
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
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 w-fit">
                <Loader2 size={16} className="animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
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
          </div>
        </div>
      </div>
    </>
  );
}
