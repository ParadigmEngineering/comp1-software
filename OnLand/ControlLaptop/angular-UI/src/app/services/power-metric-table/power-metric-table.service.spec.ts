import { TestBed } from '@angular/core/testing';

import { PowerMetricTableService } from './power-metric-table.service';

describe('PowerMetricTableService', () => {
  let service: PowerMetricTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerMetricTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
