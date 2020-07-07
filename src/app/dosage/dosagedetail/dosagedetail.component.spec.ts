import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosagedetailComponent } from './dosagedetail.component';

describe('DosagedetailComponent', () => {
  let component: DosagedetailComponent;
  let fixture: ComponentFixture<DosagedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosagedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
