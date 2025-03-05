import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../../services/chat2.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ShowChatMessage } from '../../models/show-chat-message.model';
import { NewChatMessage } from '../../models/new-chat-message.model';
import { GroqApiService } from '../../api/groq-api.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatMessageComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  // Use signals for reactive state
  messages = signal<ShowChatMessage[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
response = ''
  chatForm: FormGroup;
  private destroy$ = new Subject<void>();

  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);
  constructor(private groqService: GroqApiService) {
    this.chatForm = this.fb.group({
      textContent: ['', [Validators.required, Validators.minLength(1)]],
      images: [null]
    });
  }
  askGroq(message:string) {
    this.groqService.generateResponse(message).subscribe(
      (res) => {
        // this.response = res.choices[0].message.content; // Extract response
        this.chatService.createMessage({
            senderId: 1,
            content: res.choices[0].message.content,
            timestamp: new Date(),
            chatId: 1,
            senderType:2
          });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ngOnInit(): void {
    this.loadMessages();

    // Subscribe to messages from the store
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages.set(messages);
      });

    // Subscribe to loading state
    this.chatService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading.set(loading);
      });

    // Subscribe to error state
    this.chatService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error.set(error);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMessages(): void {
    // Simply dispatch the action to load messages
    // The loading and error states will be handled by the subscriptions in ngOnInit
    this.chatService.loadAllMessages();
  }

  sendMessage(): void {
    if (this.chatForm.invalid) {
      console.log("invalid");
      this.chatForm.markAllAsTouched();
      return;
    }

    const { textContent, images } = this.chatForm.value;
    const trimmedMessage = textContent.trim();

    if (!trimmedMessage) return;

    console.log("Actual message text: " + trimmedMessage);
    const newMessage: NewChatMessage = {
      senderId: 1,
      content: trimmedMessage,
      timestamp: new Date(),
      chatId: 1,
      senderType:1
    };

    // Dispatch action to create a message
    // The response and loading states will be handled by the subscriptions in ngOnInit
    this.chatService.createMessage(newMessage);
    this.askGroq(newMessage.content);

    // Reset the form after dispatching the action
    this.chatForm.reset();
  }

  retryLoadMessages(): void {
    this.loadMessages();
  }

  trackByMessageId(index: number, message: ShowChatMessage): number {
    console.log("elmsj:")
    console.log(message)

    return message.id;
  }
}
