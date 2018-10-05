import {Component} from '@angular/core';
import {BaseFormControl} from '../base-form-control';
import {ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'dg-number-input',
  styleUrls: ['./input.control.css'],
  templateUrl: './number-input.control.html',
})
export class NumberInputControl extends BaseFormControl {

  setDefaultValue(value: any): void {
    this.data[this.formControl.id] = Number(this.formControl.defaultValue);
  }

  getValidators(): ValidatorFn[] {
    console.log(this.formControl.validate);
    const validators = super.getValidators();
    if (this.min() !== undefined) {
      validators.push(Validators.min(this.min()));
    }
    if (!!this.max() !== undefined) {
      validators.push(Validators.max(this.max()));
    }
    return validators;
  }

}
