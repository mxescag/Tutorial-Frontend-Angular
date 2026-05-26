import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'; /* He quitado provideZoneevent nosequé porque la app dejaba de mostrarse en navegador */
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), /* Esto es para manejar los errores globales en la aplicación. */
    provideHttpClient(withFetch()), /* Esto es para configurar el cliente HTTP de Angular para que utilice la API Fetch en lugar de XMLHttpRequest. */
    provideRouter(routes) /* Esto es para configurar el enrutador de Angular con las rutas definidas en el archivo app.routes.ts. */
  ]
};
