import { TestBed } from '@angular/core/testing';

import { WebServices } from './web.service';

describe('WebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebServices = TestBed.get(WebServices);
    expect(service).toBeTruthy();
  });
});
