import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection ({eventCoalescing : true}), /* Esto es para mejorar el rendimiento de la aplicación al reducir la cantidad de veces que Angular tiene que realizar la detección de cambios. */
    provideBrowserGlobalErrorListeners(), /* Esto es para manejar los errores globales en la aplicación. */
    provideHttpClient(withFetch()), /* Esto es para configurar el cliente HTTP de Angular para que utilice la API Fetch en lugar de XMLHttpRequest. */
    provideRouter(routes) /* Esto es para configurar el enrutador de Angular con las rutas definidas en el archivo app.routes.ts. */
  ]
};
