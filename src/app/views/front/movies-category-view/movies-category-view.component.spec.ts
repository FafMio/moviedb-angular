import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCategoryViewComponent } from './movies-category-view.component';

describe('MoviesCategoryViewComponent', () => {
  let component: MoviesCategoryViewComponent;
  let fixture: ComponentFixture<MoviesCategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesCategoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
