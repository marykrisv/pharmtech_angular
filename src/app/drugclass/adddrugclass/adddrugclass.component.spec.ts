import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddrugclassComponent } from './adddrugclass.component';

describe('AdddrugclassComponent', () => {
  let component: AdddrugclassComponent;
  let fixture: ComponentFixture<AdddrugclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddrugclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddrugclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
