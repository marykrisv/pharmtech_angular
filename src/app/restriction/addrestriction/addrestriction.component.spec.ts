import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrestrictionComponent } from './addrestriction.component';

describe('AddrestrictionComponent', () => {
  let component: AddrestrictionComponent;
  let fixture: ComponentFixture<AddrestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
