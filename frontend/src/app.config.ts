import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { chatReducer, chatFeatureKey } from './app/store/chat/chat.reducer';
import { ChatEffects } from './app/store/chat/chat.effects';
import { routes } from './app.routes';
import { aiFeatureKey, aiReducer } from './app/store/ai/ai.reducer';
import { AiEffects } from './app/store/ai/ai.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      [chatFeatureKey]: chatReducer,
      [aiFeatureKey]: aiReducer
    }),
    provideEffects([ChatEffects,AiEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
    provideAnimations(),
  ]
};
