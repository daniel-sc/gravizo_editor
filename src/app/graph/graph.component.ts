//our graph component

import {Location} from '@angular/common';
import {Component, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import { saveAs } from 'file-saver'

declare var saveAs:any

@Component({
    selector: 'my-app',
    providers: [],
    templateUrl: 'graph.component.html'
})
export class Graph implements OnInit {

    @ViewChild('graphImage') imageElement: ElementRef;
    staticAlertClosed = false;

    public baseUrl:string = 'https://g.gravizo.com/svg?';
    public graphDescription:string = `digraph G {
     main -> parse -> execute;
     main -> init;
     main -> cleanup;
     execute -> make_string;
     execute -> printf
     init -> make_string;
     main -> printf;
     execute -> compare;
   }`;
    public imageUrl:string = this.baseUrl + this.graphDescription;

    public graphBox:FormControl = new FormControl();
    public changed:boolean = false;
    public loading:boolean = false;

    constructor(location:Location, private renderer: Renderer) {

        if (location.path(true)) {
            this.graphDescription = decodeURIComponent(location.path(true).substr(3));
        }

        this.graphBox
            .valueChanges
            .do((e) => this.changed = true)
            .debounceTime(500)
            .subscribe((event) => {
                this.imageUrl = this.baseUrl + event.replace(new RegExp("([^;\n])(\n+)", "g"), "$1;$2");
                this.changed = false;
                this.loading = true;
                location.replaceState('/', 'g=' + encodeURIComponent(event));

            });
    }

    ngOnInit() {
        console.log('initializing loading listener..');
        var graphComponent = this;
        this.renderer.listen(this.imageElement.nativeElement, 'load', function (event) {
            graphComponent.loading = false;
        });
        setTimeout(() => this.staticAlertClosed = true, 10000);
    }

    downloadDescription() {
        var blob = new Blob([this.graphDescription], {type : 'text/text', endings: 'native'});
        saveAs(blob, 'graph.txt');
    }


}
