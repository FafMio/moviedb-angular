import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieEditViewComponent} from './movie-edit-view.component';

describe('MovieEditViewComponent', () => {
  let component: MovieEditViewComponent;
  let fixture: ComponentFixture<MovieEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieEditViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
