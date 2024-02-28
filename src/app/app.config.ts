import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es');

import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {provide:LOCALE_ID, useValue:'es'},
  importProvidersFrom(HttpClientModule),]
};
