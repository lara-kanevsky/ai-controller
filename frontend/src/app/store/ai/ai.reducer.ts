import { createReducer, on } from '@ngrx/store';
import { AiActions } from './ai-table.actions';
import { Ai } from '../../models/ai.model';

export const aiFeatureKey = "ai";


export interface AiState{
    ais: Ai[];
}

export const initialState: AiState = {
  ais:[]
};

export const aiReducer = createReducer(
  initialState,
  on(AiActions.addAi, (currentState,action) => ({
    ais:[...currentState.ais,action.ai]
  })),
  on(AiActions.removeAi, (currentState,action) => ({
    ...currentState,
    ais:currentState.ais.filter(ai=>ai.id !== action.ai.id)
  }))
);
