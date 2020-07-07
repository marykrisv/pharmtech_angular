import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdosageComponent } from './viewdosage.component';

describe('ViewdosageComponent', () => {
  let component: ViewdosageComponent;
  let fixture: ComponentFixture<ViewdosageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdosageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdosageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
