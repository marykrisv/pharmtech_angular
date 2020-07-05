import { TestBed } from '@angular/core/testing';

import { ConcentrationService } from './concentration.service';

describe('ConcentrationService', () => {
  let service: ConcentrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcentrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
