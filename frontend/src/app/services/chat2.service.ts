import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatActions } from '../store/chat/chat.actions';
import {
  selectAllMessages,
  selectSelectedMessage,
  selectChatLoading,
  selectChatError
} from '../store/chat/chat.selectors';
import { ShowChatMessage } from '../models/show-chat-message.model';
import { NewChatMessage } from '../models/new-chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    messages$: Observable<ShowChatMessage[]>;
    selectedMessage$: Observable<ShowChatMessage | null>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;

    constructor(private store: Store) {
        // Initialize observables in the constructor instead
        this.messages$ = this.store.select(selectAllMessages);
        this.selectedMessage$ = this.store.select(selectSelectedMessage);
        this.loading$ = this.store.select(selectChatLoading);
        this.error$ = this.store.select(selectChatError);
      }

  loadAllMessages(): void {
    this.store.dispatch(ChatActions.loadMessages());
  }

  loadMessage(id: number): void {
    this.store.dispatch(ChatActions.loadMessage({ id }));
  }

  createMessage(message: NewChatMessage): void {
    this.store.dispatch(ChatActions.createMessage({ message }));
  }

  updateMessage(id: number, message: ShowChatMessage): void {
    this.store.dispatch(ChatActions.updateMessage({ id, message }));
  }

  deleteMessage(id: number): void {
    this.store.dispatch(ChatActions.deleteMessage({ id }));
  }

  clearSelectedMessage(): void {
    this.store.dispatch(ChatActions.clearSelectedMessage());
  }
}
