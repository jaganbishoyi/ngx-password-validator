import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPasswordValidatorComponent } from './ng-password-validator.component';

describe('NgPasswordValidatorComponent', () => {
  let component: NgPasswordValidatorComponent;
  let fixture: ComponentFixture<NgPasswordValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgPasswordValidatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPasswordValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
