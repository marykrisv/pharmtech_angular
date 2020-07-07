import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugclassdetailComponent } from './drugclassdetail.component';

describe('DrugclassdetailComponent', () => {
  let component: DrugclassdetailComponent;
  let fixture: ComponentFixture<DrugclassdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugclassdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugclassdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
