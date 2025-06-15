import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authinterceptorInterceptor } from './interceptors/authinterceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),provideClientHydration(),provideToastr(),provideAnimations(),
     provideHttpClient(withInterceptors([authinterceptorInterceptor]))]
};
