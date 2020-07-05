import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrationdetailComponent } from './concentrationdetail.component';

describe('ConcentrationdetailComponent', () => {
  let component: ConcentrationdetailComponent;
  let fixture: ComponentFixture<ConcentrationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentrationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
