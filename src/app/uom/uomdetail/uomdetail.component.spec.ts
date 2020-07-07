import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UomdetailComponent } from './uomdetail.component';

describe('UomdetailComponent', () => {
  let component: UomdetailComponent;
  let fixture: ComponentFixture<UomdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UomdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UomdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
