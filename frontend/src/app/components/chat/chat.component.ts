import { Component, OnInit, OnDestroy, signal, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../../services/chat2.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ShowChatMessage } from '../../models/show-chat-message.model';
import { NewChatMessage } from '../../models/new-chat-message.model';
import { GroqApiService } from '../../api/groq-api.service';
import { SelectModule } from 'primeng/select';
import {  ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AiService } from '../../services/ai.service';
import { Ai } from '../../models/ai.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatMessageComponent, ReactiveFormsModule, CommonModule,SelectModule,FormsModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
    private destroyRef = inject(DestroyRef);
  // Use signals for reactive state
  messages = signal<ShowChatMessage[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  dropdownValues=signal<Ai[]>([]);
  dropdownValue=signal<Ai>({
    id: 0,
    url: '',
    model: 'Select model',
    key:'',
    ownerId:1
  });

  response = signal<string | null>(null);
  chatForm: FormGroup;
  private destroy$ = new Subject<void>();

  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);
  private aiService = inject(AiService);

  constructor(private groqService: GroqApiService) {
    this.chatForm = this.fb.group({
      textContent: ['', [Validators.required, Validators.minLength(1)]],
      images: [null]
    });
  }
  askGroq(message:string) {
    console.log("in ask grok")
    console.log(this.dropdownValue()?.url)

    this.groqService.generateResponse(
        message,
        this.dropdownValue()?.model,
        this.dropdownValue()?.url,
        this.dropdownValue()?.key
      ).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (res) => {
          // If you want to use a signal to track the response
          this.response.set(res.choices[0].message.content);

          this.chatService.createMessage({
            senderId: 1,
            content: res.choices[0].message.content,
            timestamp: new Date(),
            chatId: 1,
            senderType: 2
          });
        }
      });
  }
  ngOnInit(): void {
    this.loadMessages();
    this.aiService.getAllAis().subscribe(ai=>{this.dropdownValues.set(ai)})
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

    return message.id;
  }
  @ViewChild('messageContainer') messageContainer!: ElementRef;

ngAfterViewChecked() {
  this.scrollToBottom();
}
updateDropdownValue(value: Ai) {
    this.dropdownValue.set(value);
  }
scrollToBottom() {
  try {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  } catch(err) {}
}
}
