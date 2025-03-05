import { createReducer, on } from '@ngrx/store';
import { AiActions } from './ai-table.actions';
import { Ai } from '../../models/ai.model';
import { AiAPIActions } from './ai-api.actions';

export const aiFeatureKey = "ai";


export interface AiState{
    ais: Ai[];
}

export const initialState: AiState = {
  ais:[]
};

export const aiReducer = createReducer(
  initialState,
  on(AiAPIActions.saveSuccess, (state, action) => ({
    ...state,
    ais: [...state.ais, action.ai],
  })),
  on(AiAPIActions.loadAllSuccess, (state, { ais }) => ({
    ...state,
    ais,
    loading: false
  })),
  on(AiActions.removeAi, (currentState,action) => ({
    ...currentState,
    ais:currentState.ais.filter(ai=>ai.id !== action.ai.id)
  }))
);
