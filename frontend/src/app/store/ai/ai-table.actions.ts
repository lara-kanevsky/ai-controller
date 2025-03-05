import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Ai } from "../../models/ai.model";

export const AiActions = createActionGroup({
  source: 'Ai table',
  events: {
    // Load all messages
    'Add Ai': props<{ai:Ai}>(),
    'Remove Ai': props<{ai:Ai}>(),
    'Load all ais': emptyProps(),
  }
});
