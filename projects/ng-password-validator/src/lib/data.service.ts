import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStatus } from './ng-password-validator.interface';

import { initializeStage } from './options';

@Injectable()
export class DataService {
  private value = new BehaviorSubject(initializeStage);
  updatedValue = this.value.asObservable();

  updateValue(data: IStatus): void {
    this.value.next(data);
  }
}
