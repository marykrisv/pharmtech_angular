import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddrugallergyComponent } from './adddrugallergy.component';

describe('AdddrugallergyComponent', () => {
  let component: AdddrugallergyComponent;
  let fixture: ComponentFixture<AdddrugallergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddrugallergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddrugallergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
