import { TestBed } from '@angular/core/testing';

import { SurfService } from './surf.service';

describe('SurfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurfService = TestBed.get(SurfService);
    expect(service).toBeTruthy();
  });
});
