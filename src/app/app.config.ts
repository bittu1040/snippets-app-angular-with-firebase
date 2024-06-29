import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat'; // Compatibility import
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { loggerInterceptor } from './interceptors/logger.interceptor';
 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)),
    provideHttpClient(withInterceptors([authInterceptor, loggerInterceptor])),
  ]
};
