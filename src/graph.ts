//our graph component

import {Location, Control, FORM_DIRECTIVES} from '@angular/common';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

declare var saveAs:any

@Component({
  selector: 'my-graph',
  providers: [],
  templateUrl: 'src/graph.html',
  directives: [FORM_DIRECTIVES]
})
export class Graph /*implements OnInit*/ {

  //@ViewChild('graphImage') input: ElementRef;
  
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
  
  constructor(location:Location) {

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
          location.replaceState('/', encodeURIComponent(event));

        });
  }

  invokeChanged() {
      console.log("graph changed!");
  }

    ngOnInit() {
    console.log('graph ngOnInit');
    }
  
  downloadDescription() {
    var blob = new Blob([this.graphDescription], {type : 'text/text', endings: 'native'});
      saveAs(blob, 'graph.txt');
  }
  
  
}