//our graph component

import {Location, Control, FORM_DIRECTIVES} from '@angular/common';
import {Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, Renderer} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

declare var saveAs:any

@Component({
  selector: 'my-graph',
  providers: [],
  templateUrl: 'src/graph.html',
  directives: [FORM_DIRECTIVES]
})
export class Graph implements OnInit {

  @ViewChild('graphImage') imageElement: ElementRef;
  
  public baseUrl:string = 'https://g.gravizo.com/g?';
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
   
  private graphBox:Control = new Control();
  public changed:boolean = false;
  public loading:boolean = false;
  
  constructor(location:Location, private renderer: Renderer) {

    if (location.path(true)) {
      this.graphDescription = decodeURIComponent(location.path(true).substr(2));
    }
    
    this.graphBox
        .valueChanges
        .do((e) => this.changed = true)
        .debounceTime(500)
        .subscribe((event) => { 
          this.imageUrl = this.baseUrl + event.replace(new RegExp("([^;\n])(\n+)", "g"), "$1;$2");
          this.changed = false;
          this.loading = true;
          location.replaceState('/', encodeURIComponent(event));

        });
  }

    ngOnInit() {
        console.log('initializing loading listener..');
        var graphComponent = this;
        this.renderer.listen(this.imageElement.nativeElement, 'load', function (event) {
            graphComponent.loading = false;
        });
    }
  
  downloadDescription() {
    var blob = new Blob([this.graphDescription], {type : 'text/text', endings: 'native'});
    saveAs(blob, 'graph.txt');
  }
  
  
}