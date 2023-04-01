import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLineComponent } from './movie-line.component';

describe('MovieLineComponent', () => {
  let component: MovieLineComponent;
  let fixture: ComponentFixture<MovieLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
