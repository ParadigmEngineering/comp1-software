import { TestBed } from '@angular/core/testing';

import { NaturalGasService } from './natural-gas.service';

describe('NaturalGasService', () => {
  let service: NaturalGasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturalGasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
