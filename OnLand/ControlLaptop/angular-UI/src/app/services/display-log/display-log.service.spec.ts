import { TestBed } from '@angular/core/testing';

import { DisplayLogService } from './display-log.service';

describe('DisplayLogService', () => {
  let service: DisplayLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
