import { ShowChatMessage } from "./show-chat-message.model";

export class Chat {
    id: number;
    chatMessages: ShowChatMessage[];

    constructor(id: number) {
        this.id = id;
        this.chatMessages = [];
    }
}
