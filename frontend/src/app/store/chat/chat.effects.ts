import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ChatApiService } from '../../api/chat-api.service';
import { ChatActions } from './chat.actions';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatApiService: ChatApiService
  ) {}

  // Move the effect definitions after the constructor
  loadMessages$ = createEffect(() => this.actions$.pipe(
    ofType(ChatActions.loadMessages),
    switchMap(() => this.chatApiService.getAllChats().pipe(
      map((messages) => ChatActions.loadMessagesSuccess({ messages })),
      catchError((error) => of(ChatActions.loadMessagesFailure({ error: error.message })))
    ))
  ));

  loadMessage$ = createEffect(() => this.actions$.pipe(
    ofType(ChatActions.loadMessage),
    mergeMap(({ id }) => this.chatApiService.getChatById(id).pipe(
      map((message) => ChatActions.loadMessageSuccess({ message })),
      catchError((error) => of(ChatActions.loadMessageFailure({ error: error.message })))
    ))
  ));

  createMessage$ = createEffect(() => this.actions$.pipe(
    ofType(ChatActions.createMessage),
    mergeMap(({ message }) => this.chatApiService.createChatMessage(message).pipe(
      map((createdMessage) => ChatActions.createMessageSuccess({ message: createdMessage })),
      catchError((error) => of(ChatActions.createMessageFailure({ error: error.message })))
    ))
  ));

  updateMessage$ = createEffect(() => this.actions$.pipe(
    ofType(ChatActions.updateMessage),
    mergeMap(({ id, message }) => this.chatApiService.updateChatMessage(id, message).pipe(
      map(() => ChatActions.updateMessageSuccess({ message })),
      catchError((error) => of(ChatActions.updateMessageFailure({ error: error.message })))
    ))
  ));

  deleteMessage$ = createEffect(() => this.actions$.pipe(
    ofType(ChatActions.deleteMessage),
    mergeMap(({ id }) => this.chatApiService.deleteChatMessage(id).pipe(
      map(() => ChatActions.deleteMessageSuccess({ id })),
      catchError((error) => of(ChatActions.deleteMessageFailure({ error: error.message })))
    ))
  ));


}
