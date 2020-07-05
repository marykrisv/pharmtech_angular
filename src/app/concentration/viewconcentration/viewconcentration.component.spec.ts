import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewconcentrationComponent } from './viewconcentration.component';

describe('ViewconcentrationComponent', () => {
  let component: ViewconcentrationComponent;
  let fixture: ComponentFixture<ViewconcentrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewconcentrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewconcentrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
