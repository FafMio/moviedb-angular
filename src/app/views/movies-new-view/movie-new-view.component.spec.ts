import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNewViewComponent } from './movie-new-view.component';

describe('MovieNewViewComponent', () => {
  let component: MovieNewViewComponent;
  let fixture: ComponentFixture<MovieNewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieNewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieNewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
