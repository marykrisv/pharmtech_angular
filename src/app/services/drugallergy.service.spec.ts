import { TestBed } from '@angular/core/testing';

import { DrugallergyService } from './drugallergy.service';

describe('DrugallergyService', () => {
  let service: DrugallergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugallergyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
