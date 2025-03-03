export class ChatMessage {
    id: number;
    senderType: 'user' | 'bot';
    content: string;
    timestamp: Date;
    senderName: string;

    constructor(id: number, senderType: 'user' | 'bot', content: string, senderName: string, timestamp?: Date) {
        this.id = id;
        this.senderType = senderType;
        this.senderName = senderName;
        this.content = content;
        this.timestamp = timestamp || new Date();
    }
}
