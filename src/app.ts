//our root app component

import {Control, FORM_DIRECTIVES} from '@angular/common';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

import 'filesaver';


@Component({
  selector: 'my-app',
  providers: [],
  templateUrl: 'src/graphComponent.html',
  directives: [FORM_DIRECTIVES]
})
export class App {
  
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
  
  constructor() { 
    
    this.graphBox
        .valueChanges
        .do((e) => this.changed = true)
        .debounceTime(500)
        .subscribe((event) => { 
          this.imageUrl = this.baseUrl + event.replace(new RegExp("([^;\n])(\n+)", "g"), "$1;$2");
          this.changed = false;
        });
  }
  
  downloadDescription() {
    var blob = new Blob([this.graphDescription], {type : 'text/text', endings: 'native'});
    saveAs(blob, 'graph.txt');
  }
  
  
}