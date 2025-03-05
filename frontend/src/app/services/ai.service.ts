import { inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatActions } from '../store/chat/chat.actions';
import {
  selectAllMessages,
  selectSelectedMessage,
  selectChatLoading,
  selectChatError
} from '../store/chat/chat.selectors';
import { Ai } from '../models/ai.model';
import { AiActions } from '../store/ai/ai-table.actions';
import { selectAis } from '../store/ai/ai.selectors';

@Injectable({
  providedIn: 'root',
})
export class AiService{



    private store = inject(Store);
    ais$: Observable<Ai[]> = this.store.select(selectAis);


  addAi(ai:Ai): void {
    this.store.dispatch(AiActions.addAi({ai}));
  }

  removeAi(ai: Ai): void {
    this.store.dispatch(AiActions.removeAi({ai}));
  }

}
