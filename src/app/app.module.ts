import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {
    routing,
    appRoutingProviders
} from './app.routing';
import {Graph} from './graph/graph.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        Graph,
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [Graph]
})
export class AppModule {
}
