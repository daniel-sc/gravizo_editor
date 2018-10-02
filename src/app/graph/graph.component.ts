import {Location} from '@angular/common';
import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';


import {saveAs} from 'file-saver'
import {debounceTime, tap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

declare let saveAs: any;

@Component({
  selector: 'app-my-app',
  providers: [],
  templateUrl: 'graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @ViewChild('graphImage') imageElement: ElementRef;
  @ViewChild('urlInput') urlInputElement: ElementRef;
  staticAlertClosed = false;
  showLoad = false;
  loadUrl: string;
  originalSize = false;

  public baseUrl = 'https://g.gravizo.com/';
  public imageUrl: string;

  private graphDescription: string;
  public graphBox: FormControl = new FormControl();
  public imageType: FormControl = new FormControl();
  public changed = false;
  public loading = false;

  constructor(private location: Location, private renderer: Renderer2) {

    combineLatest(this.graphBox.valueChanges, this.imageType.valueChanges)
      .pipe(
        tap(([graph, imageType]) => {
          this.changed = true;
          this.graphDescription = graph;
        }),
        debounceTime(500),
        tap(([graph, imageType]) => {
          const oldUrl = this.imageUrl;
          this.imageUrl = this.baseUrl
            + imageType
            + '?'
            + graph.replace(new RegExp('([^;\n])(\n+)', 'g'), '$1;$2');
          this.loading = oldUrl !== this.imageUrl;
        })
      ).subscribe(([graph, imageType]) => {
      this.changed = false;
      location.replaceState('/', 'g=' + encodeURIComponent(graph));
    });
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

  load() {
    const query = this.loadUrl.split('?')[1];
    this.graphBox.setValue(decodeURIComponent(query).replace(new RegExp(';', 'g'), '\n'));
    this.loadUrl = null;
    this.showLoadUrl(false);
  }

  ngOnInit() {
    console.log('initializing loading listener..');
    this.imageType.setValue('svg');
    if (this.location.path(true)) {
      this.graphBox.setValue(decodeURIComponent(this.location.path(true).substr(3)));
    } else { // default value
      this.graphBox.setValue(`digraph G {
     main -> parse -> execute;
     main -> init;
     main -> cleanup;
     execute -> make_string;
     execute -> printf
     init -> make_string;
     main -> printf;
     execute -> compare;
   }`);
    }

    const graphComponent = this;
    this.renderer.listen(this.imageElement.nativeElement, 'load', function () {
      graphComponent.loading = false;
    });
    setTimeout(() => this.staticAlertClosed = true, 10000);
  }

  downloadDescription() {
    const blob = new Blob([this.graphDescription], {type: 'text/text', endings: 'native'});
    saveAs(blob, 'graph.txt');
  }

}
