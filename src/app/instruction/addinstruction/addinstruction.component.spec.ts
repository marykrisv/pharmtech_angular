import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinstructionComponent } from './addinstruction.component';

describe('AddinstructionComponent', () => {
  let component: AddinstructionComponent;
  let fixture: ComponentFixture<AddinstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
