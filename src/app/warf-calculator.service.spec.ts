import { TestBed } from '@angular/core/testing';

import { WarfCalculatorService } from './warf-calculator.service';

describe('WarfCalculatorService', () => {
  let service: WarfCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarfCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
