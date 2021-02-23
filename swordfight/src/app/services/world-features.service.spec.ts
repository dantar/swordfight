import { TestBed } from '@angular/core/testing';

import { WorldFeaturesService } from './world-features.service';

describe('WorldFeaturesService', () => {
  let service: WorldFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
