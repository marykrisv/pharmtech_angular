import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictiondetailComponent } from './restrictiondetail.component';

describe('RestrictiontdetailComponent', () => {
  let component: RestrictiondetailComponent;
  let fixture: ComponentFixture<RestrictiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
