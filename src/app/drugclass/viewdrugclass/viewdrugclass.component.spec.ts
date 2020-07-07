import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdrugclassComponent } from './viewdrugclass.component';

describe('ViewdrugclassComponent', () => {
  let component: ViewdrugclassComponent;
  let fixture: ComponentFixture<ViewdrugclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdrugclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdrugclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
