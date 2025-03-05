import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustAll, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { ChatApiService } from '../../api/chat-api.service';
import { AiApiService } from '../../api/ai-api.service';
import { AiActions } from './ai-table.actions';
import { AiAPIActions } from './ai-api.actions';

@Injectable()
export class AiEffects {
  constructor(
    private actions$: Actions,
    private aiApiService: AiApiService
  ) {}

  // Move the effect definitions after the constructor
  loadAis$ = createEffect(() => this.actions$.pipe(
    ofType(AiActions.loadAllAis),
    exhaustMap(() => this.aiApiService.getAllApis().pipe(
      map((ais) => AiAPIActions.loadAllSuccess({ ai:ais }))
    ))
  ));


}
