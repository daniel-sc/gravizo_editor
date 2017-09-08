import {Location} from '@angular/common';
import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import {saveAs} from 'file-saver'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare let saveAs: any;

@Component({
    selector: 'my-app',
    providers: [],
    templateUrl: 'graph.component.html',
    styleUrls: ['./graph.component.scss']
})
export class Graph implements OnInit {

    @ViewChild('graphImage') imageElement: ElementRef;
    @ViewChild('urlInput') urlInputElement: ElementRef;
    staticAlertClosed = false;
    showLoad = false;
    loadUrl: string;
    originalSize = false;

    public baseUrl: string = 'https://g.gravizo.com/';
    private _fileType = 'svg';
    public graphDescription: string = `digraph G {
     main -> parse -> execute;
     main -> init;
     main -> cleanup;
     execute -> make_string;
     execute -> printf
     init -> make_string;
     main -> printf;
     execute -> compare;
   }`;
    public imageUrl: string;

    public graphBox: FormControl = new FormControl();
    public changed: boolean = false;
    public loading: boolean = false;

    constructor(location: Location, private renderer: Renderer2, private modalService: NgbModal) {

        if (location.path(true)) {
            this.graphDescription = decodeURIComponent(location.path(true).substr(3));
        }

        this.graphBox
            .valueChanges
            .do((e) => this.changed = true)
            .debounceTime(500)
            .subscribe((event) => {
                this.updateImageUrl();
                this.changed = false;
                location.replaceState('/', 'g=' + encodeURIComponent(event));
            });
    }

    private updateImageUrl() {
        let oldUrl = this.imageUrl;
        this.imageUrl = this.baseUrl
            + this.fileType
            + '?'
            + this.graphDescription.replace(new RegExp("([^;\n])(\n+)", "g"), "$1;$2");
        this.loading = oldUrl != this.imageUrl;
    }

    set fileType(fileType: string) {
        this._fileType = fileType;
        this.updateImageUrl();
    }

    showLoadUrl(show: boolean) {
        this.showLoad = show;
        if (show) {
            // wait for element be be visible, then set focus:
            setTimeout(() => {
                this.urlInputElement.nativeElement.focus();
                this.urlInputElement.nativeElement.select();
            }, 10);
        }
    }

    get fileType() {
        return this._fileType;
    }

    load() {
        let query = this.loadUrl.split('?')[1];
        this.graphDescription = decodeURIComponent(query).replace(new RegExp(';', 'g'), '\n');
        this.loadUrl = null;
        this.showLoadUrl(false);
    }

    ngOnInit() {
        console.log('initializing loading listener..');
        let graphComponent = this;
        this.renderer.listen(this.imageElement.nativeElement, 'load', function () {
            graphComponent.loading = false;
        });
        setTimeout(() => this.staticAlertClosed = true, 10000);
        this.updateImageUrl();
    }

    downloadDescription() {
        let blob = new Blob([this.graphDescription], {type: 'text/text', endings: 'native'});
        saveAs(blob, 'graph.txt');
    }


}
