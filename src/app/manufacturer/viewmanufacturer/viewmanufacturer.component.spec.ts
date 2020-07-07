import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanufacturerComponent } from './viewmanufacturer.component';

describe('ViewmanufacturerComponent', () => {
  let component: ViewmanufacturerComponent;
  let fixture: ComponentFixture<ViewmanufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmanufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmanufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
