/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread appConfig properties
  providers: [
    provideHttpClient(),
    ...(appConfig.providers || []) // Ensure other providers are included
  ]
}).catch(err => console.error(err));