import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph } from './graph.component';

describe('GraphComponent', () => {
  let component: Graph;
  let fixture: ComponentFixture<Graph>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Graph ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Graph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
