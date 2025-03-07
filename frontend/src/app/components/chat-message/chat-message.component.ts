import { Component,input } from '@angular/core';
import { ShowChatMessage } from '../../models/show-chat-message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
    message = input<ShowChatMessage>()
}
