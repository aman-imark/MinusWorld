import { TestBed } from '@angular/core/testing';

import { ChkNetworkService } from './chk-network.service';

describe('ChkNetworkService', () => {
  let service: ChkNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChkNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
