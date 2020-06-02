import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EprescriptionComponent } from './eprescription.component';

describe('EprescriptionComponent', () => {
  let component: EprescriptionComponent;
  let fixture: ComponentFixture<EprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
