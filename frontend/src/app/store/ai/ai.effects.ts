import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map } from 'rxjs/operators';
import { AiApiService } from '../../api/ai-api.service';
import { AiActions } from './ai-table.actions';
import { AiAPIActions } from './ai-api.actions';

@Injectable()
export class AiEffects {
  constructor(
    private actions$: Actions,
    private aiApiService: AiApiService
  ) { }

  loadAis$ = createEffect(() => this.actions$.pipe(
    ofType(AiActions.loadAllAis),
    exhaustMap(() => this.aiApiService.getAllAis().pipe(
      map((ais) => AiAPIActions.loadAllSuccess({ ais}))
    ))
  ));

  createAi$ = createEffect(() => this.actions$.pipe(
    ofType(AiActions.addAi),
    concatMap((action) => this.aiApiService.createAi(action.newAi).pipe(
      map((ai) => AiAPIActions.saveSuccess({ ai: ai }))
    ))
  ));

  removeAi$ = createEffect(() => this.actions$.pipe(
    ofType(AiActions.removeAi),
    concatMap((action) => this.aiApiService.deleteAi(action.id).pipe(
      map((ai) => AiAPIActions.deleteSuccess({ ai: ai }))
    ))
  ));

}
