import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduomComponent } from './adduom.component';

describe('AdduomComponent', () => {
  let component: AdduomComponent;
  let fixture: ComponentFixture<AdduomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
