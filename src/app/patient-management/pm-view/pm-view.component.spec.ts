import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmViewComponent } from './pm-view.component';

describe('PmViewComponent', () => {
  let component: PmViewComponent;
  let fixture: ComponentFixture<PmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
