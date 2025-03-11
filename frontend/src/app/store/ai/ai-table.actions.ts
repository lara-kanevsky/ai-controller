import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { NewAi } from "../../models/new-ai.model";

export const AiActions = createActionGroup({
  source: 'Ai table',
  events: {
    // Load all messages
    'Add Ai': props<{ai:NewAi}>(),
    'Remove Ai': props<{id:number}>(),
    'Load all ais': emptyProps(),
  }
});
