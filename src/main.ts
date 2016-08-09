//main entry point
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app';
import {Graph} from './graph';
import {provideRouter} from '@angular/router';

bootstrap(App, [provideRouter([{
    path: '',
    component: Graph
}])]).catch(err => console.error(err));