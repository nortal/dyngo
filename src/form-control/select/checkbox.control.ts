import {Component} from '@angular/core';
import {BaseFormControl} from '../base-form-control';

@Component({
  selector: 'dg-checkbox',
  styleUrls: ['./select.control.css'],
  templateUrl: './checkbox.control.html',
})
export class CheckboxControl extends BaseFormControl {

  public ngOnInit(): void {
    super.ngOnInit();
    if (!this.data[this.formControl.id]) {
      console.log('creating empty array');
      this.data[this.formControl.id] = [];
    }
  }

  public isChecked(optionCode: string): boolean {
    return this.data[this.formControl.id].indexOf(optionCode) !== -1;
  }

}
