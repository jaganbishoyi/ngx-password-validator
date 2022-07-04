import { TestBed } from '@angular/core/testing';

import { NgPasswordValidatorService } from './ng-password-validator.service';

describe('NgPasswordValidatorService', () => {
  let service: NgPasswordValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPasswordValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
