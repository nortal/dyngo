import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseFormControl} from '../base-form-control';

@Component({
  selector: 'dg-number-input',
  styleUrls: ['./input.control.css'],
  templateUrl: './number-input.control.html',
})
export class NumberInputControl extends BaseFormControl  {

  setDefaultValue(value: any): void {
    this.data[this.formControl.id] = Number(this.formControl.defaultValue);
  }


}
