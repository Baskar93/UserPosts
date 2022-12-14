import { TestBed } from '@angular/core/testing';

import { TokeninterceptorsService } from './tokeninterceptors.service';

describe('TokeninterceptorsService', () => {
  let service: TokeninterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokeninterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
