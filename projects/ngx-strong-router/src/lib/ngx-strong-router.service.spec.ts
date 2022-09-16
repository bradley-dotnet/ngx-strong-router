import { TestBed } from '@angular/core/testing';

import { NgxStrongRouterService } from './ngx-strong-router.service';

describe('NgxStrongRouterService', () => {
  let service: NgxStrongRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxStrongRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
