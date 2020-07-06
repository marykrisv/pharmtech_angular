import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountdetailComponent } from './discountdetail.component';

describe('DiscountdetailComponent', () => {
  let component: DiscountdetailComponent;
  let fixture: ComponentFixture<DiscountdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
