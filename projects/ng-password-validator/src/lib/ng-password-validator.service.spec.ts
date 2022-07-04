import { TestBed } from '@angular/core/testing';

import { NgPasswordValidatorTestService } from './ng-password-validator.service';

describe('NgPasswordValidatorTestService', () => {
  let service: NgPasswordValidatorTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPasswordValidatorTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
