import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstrengthComponent } from './addstrength.component';

describe('AddstrengthComponent', () => {
  let component: AddstrengthComponent;
  let fixture: ComponentFixture<AddstrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
