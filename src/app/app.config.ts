import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from './enviroments/enviroment';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { API_BASE_URL } from '../../projects/auth/src/lib/token/api-token';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
  {
    provide: API_BASE_URL, useValue: environment.baseUrl
  }, provideStore({
    Auth: authReducer
  }),
  provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: Aura
    }
  })
  ]
};
