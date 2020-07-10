import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugallergydetailComponent } from './drugallergydetail.component';

describe('DrugallergydetailComponent', () => {
  let component: DrugallergydetailComponent;
  let fixture: ComponentFixture<DrugallergydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugallergydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugallergydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
