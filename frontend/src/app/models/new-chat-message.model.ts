export class NewChatMessage {
    content: string;
    timestamp: Date;
    senderId:number;
    chatId:number;
    senderType:number;

    constructor(userId:number, content: string,  timestamp: Date,chatId:number) {
        this.senderId = userId;
        this.content = content;
        this.timestamp = timestamp || new Date();
        this.chatId = chatId;
        this.senderType = 1;
    }
}
