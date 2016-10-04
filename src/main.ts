//main entry point
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './app';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
