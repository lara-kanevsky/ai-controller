import { inject, Injectable, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ai } from '../models/ai.model';
import { AiActions } from '../store/ai/ai-table.actions';
import { selectAis } from '../store/ai/ai.selectors';
import { HttpClient } from '@angular/common/http';
import { AiApiService } from '../api/ai-api.service';
import { NewAi } from '../models/new-ai.model';

@Injectable({
    providedIn: 'root',
})
export class AiService {
    private store = inject(Store);
    private http = inject(HttpClient);

    ais$: Observable<Ai[]> = this.store.select(selectAis);

    addAi(ai: Ai): void {
        const { id, ...newAiProperties } = ai;
        let newAi =  new NewAi(newAiProperties.key, newAiProperties.ownerId, newAiProperties.url, newAiProperties.model);
    
        this.store.dispatch(AiActions.addAi({ newAi }));

    }

    removeAi(id: number): void {
        this.store.dispatch(AiActions.removeAi({ id }));
    }

    getAllAis(): void {
        this.store.dispatch(AiActions.loadAllAis());
    }
}
