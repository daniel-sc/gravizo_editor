import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing,
         appRoutingProviders }  from './app.routing';
import { Graph }   from './graph';

@NgModule({
  imports: [ 
    BrowserModule,
    routing 
  ],
  declarations: [ Graph ],
  providers: [ appRoutingProviders ],
  bootstrap: [ Graph ]
})
export class AppModule { }
