import { TestBed } from '@angular/core/testing';

import { SwordsService } from './swords.service';

describe('SwordsService', () => {
  let service: SwordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
