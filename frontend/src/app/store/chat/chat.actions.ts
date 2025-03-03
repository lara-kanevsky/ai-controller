import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ShowChatMessage } from '../../models/show-chat-message.model';
import { NewChatMessage } from '../../models/new-chat-message.model';

export const ChatActions = createActionGroup({
  source: 'Chat',
  events: {
    // Load all messages
    'Load Messages': emptyProps(),
    'Load Messages Success': props<{ messages: ShowChatMessage[] }>(),
    'Load Messages Failure': props<{ error: string }>(),

    // Load single message
    'Load Message': props<{ id: number }>(),
    'Load Message Success': props<{ message: ShowChatMessage }>(),
    'Load Message Failure': props<{ error: string }>(),

    // Create message
    'Create Message': props<{ message: NewChatMessage }>(),
    'Create Message Success': props<{ message: ShowChatMessage }>(),
    'Create Message Failure': props<{ error: string }>(),

    // Update message
    'Update Message': props<{ id: number; message: ShowChatMessage }>(),
    'Update Message Success': props<{ message: ShowChatMessage }>(),
    'Update Message Failure': props<{ error: string }>(),

    // Delete message
    'Delete Message': props<{ id: number }>(),
    'Delete Message Success': props<{ id: number }>(),
    'Delete Message Failure': props<{ error: string }>(),

    // Clear selected message
    'Clear Selected Message': emptyProps(),
  }
});
