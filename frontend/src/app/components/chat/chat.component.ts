import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service'; // Make sure to import the ChatService
import { ChatMessage } from '../../models/chat-message.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat',
    imports: [ChatMessageComponent, ReactiveFormsModule],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    messages: ChatMessage[] = [];

    formChat = new FormGroup({
        textContent: new FormControl(''),
        images: new FormControl(null)
    });

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.loadMessages(); // Load messages when the component initializes
    }

    // Load all chat messages from the API
    loadMessages(): void {
        this.chatService.getAllChats().subscribe(
            (data) => {
                this.messages = data;
            },
            (error) => {
                console.error('Error fetching chat messages:', error);
            }
        );
    }

    // Send a new chat message
    sendMessage(): void {
        const { textContent, images } = this.formChat.value;
        const messageText = textContent ?? ''; // Default to empty string if null or undefined

        if (messageText.trim()) {
            const newMessage = new ChatMessage(
                this.messages.length + 1, // Just incrementing for the sake of this example
                'user', // Assuming the user is sending the message
                messageText,
                'Lare' // You can dynamically change the sender's name if needed
            );

            this.chatService.createChatMessage(newMessage).subscribe(
                () => {
                    this.messages.push(newMessage); // Add the message to the chat list
                    this.formChat.reset(); // Reset the form after sending
                },
                (error) => {
                    console.error('Error sending chat message:', error);
                }
            );
        }
    }
}
