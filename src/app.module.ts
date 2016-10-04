import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { routing,
         appRoutingProviders }  from './app.routing';
import { Graph }   from './graph';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    routing 
  ],
  declarations: [ Graph ],
  providers: [ appRoutingProviders ],
  bootstrap: [ Graph ]
})
export class AppModule { }
