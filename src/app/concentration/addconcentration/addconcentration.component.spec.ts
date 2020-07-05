import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconcentrationComponent } from './addconcentration.component';

describe('AddconcentrationComponent', () => {
  let component: AddconcentrationComponent;
  let fixture: ComponentFixture<AddconcentrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddconcentrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconcentrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
