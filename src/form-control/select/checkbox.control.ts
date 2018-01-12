import {Component} from '@angular/core';
import {BaseFormControl} from '../base-form-control';

@Component({
  selector: 'dg-checkbox',
  styleUrls: ['./select.control.css'],
  templateUrl: './checkbox.control.html',
})
export class CheckboxControl extends BaseFormControl {

  public getDataObject(): any[] {
    if (!this.data[this.formControl.id]) {
      this.data[this.formControl.id] = [];
    }
    return this.data[this.formControl.id];
  }

}
