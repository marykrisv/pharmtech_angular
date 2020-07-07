import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewuomComponent } from './viewuom.component';

describe('ViewuomComponent', () => {
  let component: ViewuomComponent;
  let fixture: ComponentFixture<ViewuomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewuomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewuomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
