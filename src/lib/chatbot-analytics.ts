/**
 * Chatbot Analytics — tracking anonyme et léger des interactions chatbot.
 * Insertion directe dans la table chatbot_events (RLS autorise INSERT anon).
 */
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "mf_chatbot_session";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `anon-${Date.now()}`;
  }
}

export type ChatbotEventType = "opened" | "message_sent" | "closed";

export async function trackChatbotEvent(eventType: ChatbotEventType): Promise<void> {
  try {
    const sessionId = getSessionId();
    const pagePath = typeof window !== "undefined" ? window.location.pathname : null;
    // Fire-and-forget — never block UI
    await supabase.from("chatbot_events").insert({
      event_type: eventType,
      session_id: sessionId,
      page_path: pagePath,
    });
  } catch {
    // Silent fail — analytics ne doit jamais casser l'UX
  }
}
