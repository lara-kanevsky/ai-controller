import { ShowChatMessage } from "./show-chat-message.model";

export interface ChatState {
    messages: ShowChatMessage[];
    selectedMessage: ShowChatMessage | null;
    loading: boolean;
    error: string | null;
  }
