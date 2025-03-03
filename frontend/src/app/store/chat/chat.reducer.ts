import { createReducer, on } from '@ngrx/store';
import { ChatActions } from './chat.actions';
import { ChatState } from '../../models/chat-state.model';

export const chatFeatureKey = 'chat';

export const initialState: ChatState = {
  messages: [],
  selectedMessage: null,
  loading: false,
  error: null
};

export const chatReducer = createReducer(
  initialState,

  // Load Messages
  on(ChatActions.loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ChatActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false
  })),
  on(ChatActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Message
  on(ChatActions.loadMessage, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ChatActions.loadMessageSuccess, (state, { message }) => ({
    ...state,
    selectedMessage: message,
    loading: false
  })),
  on(ChatActions.loadMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Message
  on(ChatActions.createMessage, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ChatActions.createMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    loading: false
  })),
  on(ChatActions.createMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Message
  on(ChatActions.updateMessage, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ChatActions.updateMessageSuccess, (state, { message }) => ({
    ...state,
    messages: state.messages.map(m => m.id === message.id ? message : m),
    selectedMessage: message.id === state.selectedMessage?.id ? message : state.selectedMessage,
    loading: false
  })),
  on(ChatActions.updateMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Message
  on(ChatActions.deleteMessage, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ChatActions.deleteMessageSuccess, (state, { id }) => ({
    ...state,
    messages: state.messages.filter(message => message.id !== id),
    selectedMessage: state.selectedMessage?.id === id ? null : state.selectedMessage,
    loading: false
  })),
  on(ChatActions.deleteMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Selected Message
  on(ChatActions.clearSelectedMessage, (state) => ({
    ...state,
    selectedMessage: null
  }))
);
