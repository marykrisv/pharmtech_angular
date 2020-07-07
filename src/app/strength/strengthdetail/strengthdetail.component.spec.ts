import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthdetailComponent } from './strengthdetail.component';

describe('StrengthdetailComponent', () => {
  let component: StrengthdetailComponent;
  let fixture: ComponentFixture<StrengthdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrengthdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
