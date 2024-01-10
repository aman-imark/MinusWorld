import { TestBed } from '@angular/core/testing';

import { PushnotiService } from './pushnoti.service';

describe('PushnotiService', () => {
  let service: PushnotiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushnotiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
