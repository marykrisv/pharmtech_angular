import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlocationComponent } from './viewlocation.component';

describe('ViewlocationComponent', () => {
  let component: ViewlocationComponent;
  let fixture: ComponentFixture<ViewlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
