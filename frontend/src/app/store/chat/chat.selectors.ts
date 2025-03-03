import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatFeatureKey } from './chat.reducer';
import { ChatState } from '../../models/chat-state.model';

export const selectChatState = createFeatureSelector<ChatState>(chatFeatureKey);

export const selectAllMessages = createSelector(
  selectChatState,
  (state) => state.messages
);

export const selectSelectedMessage = createSelector(
  selectChatState,
  (state) => state.selectedMessage
);

export const selectChatLoading = createSelector(
  selectChatState,
  (state) => state.loading
);

export const selectChatError = createSelector(
  selectChatState,
  (state) => state.error
);
