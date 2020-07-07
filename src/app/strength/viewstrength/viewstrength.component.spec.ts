import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstrengthComponent } from './viewstrength.component';

describe('ViewstrengthComponent', () => {
  let component: ViewstrengthComponent;
  let fixture: ComponentFixture<ViewstrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
