export class ShowChatMessage {
    id: number;
    senderType: 1 | 2;
    content: string;
    timestamp: Date;
    senderName: string;

    constructor(id: number, senderType: 1 | 2, content: string, senderName: string, timestamp?: Date) {
        this.id = id;
        this.senderType = senderType;
        this.senderName = senderName;
        this.content = content;
        this.timestamp = timestamp || new Date();
    }
}
