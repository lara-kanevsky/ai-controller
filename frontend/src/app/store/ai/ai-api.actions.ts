import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Ai } from "../../models/ai.model";

export const AiAPIActions = createActionGroup({
  source: 'Ai API',
  events: {
    // Load all messages
    'Load all success': props<{ais:Ai[]}>(),
    'Load all fail': props<{ai:Ai}>(),
    'Save success': props<{ai:Ai}>(),

  }
});
