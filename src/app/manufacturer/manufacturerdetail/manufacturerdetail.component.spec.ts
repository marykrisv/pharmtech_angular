import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerdetailComponent } from './manufacturerdetail.component';

describe('ManufacturerdetailComponent', () => {
  let component: ManufacturerdetailComponent;
  let fixture: ComponentFixture<ManufacturerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
