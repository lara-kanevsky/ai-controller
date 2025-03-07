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

    addAi(ai: NewAi): void {
         this.store.dispatch(AiActions.addAi({ ai }));

    }

    removeAi(ai: Ai): void {
        this.store.dispatch(AiActions.removeAi({ ai }));
    }
    getAllAis(): Observable<Ai[]> {
        return this.http.get<Ai[]>('https://localhost:7214/ai');
    }
}
