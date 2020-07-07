import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddosageComponent } from './adddosage.component';

describe('AdddosageComponent', () => {
  let component: AdddosageComponent;
  let fixture: ComponentFixture<AdddosageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddosageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddosageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
