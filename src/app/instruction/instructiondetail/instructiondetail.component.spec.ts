import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructiontdetailComponent } from './instructiondetail.component';

describe('InstructiontdetailComponent', () => {
  let component: InstructiontdetailComponent;
  let fixture: ComponentFixture<InstructiontdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructiontdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructiontdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
