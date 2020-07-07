import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrestrictionComponent } from './viewrestriction.component';

describe('ViewrestrictionComponent', () => {
  let component: ViewrestrictionComponent;
  let fixture: ComponentFixture<ViewrestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewrestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
