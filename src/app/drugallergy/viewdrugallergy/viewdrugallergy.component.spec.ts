import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdrugallergyComponent } from './viewdrugallergy.component';

describe('ViewdrugallergyComponent', () => {
  let component: ViewdrugallergyComponent;
  let fixture: ComponentFixture<ViewdrugallergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdrugallergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdrugallergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
