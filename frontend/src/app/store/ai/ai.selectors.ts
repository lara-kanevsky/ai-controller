import { createFeatureSelector, createSelector } from "@ngrx/store";
import { aiFeatureKey, AiState } from "./ai.reducer";

export const selectAiState = createFeatureSelector<AiState>(aiFeatureKey);


export const selectAis = createSelector(
    selectAiState,
  (aiState) => aiState.ais
);

