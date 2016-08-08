//our root component

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'my-app',
  providers: [],
  templateUrl: 'src/app.html',
  directives: [ROUTER_DIRECTIVES]
})
export class App {
  
}