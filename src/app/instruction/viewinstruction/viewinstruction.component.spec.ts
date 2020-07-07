import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinstructionComponent } from './viewinstruction.component';

describe('ViewinstructionComponent', () => {
  let component: ViewinstructionComponent;
  let fixture: ComponentFixture<ViewinstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
