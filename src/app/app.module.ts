import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {
    routing,
    appRoutingProviders
} from './app.routing';
import {GraphComponent} from './graph/graph.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        GraphComponent,
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [GraphComponent]
})
export class AppModule {
}
