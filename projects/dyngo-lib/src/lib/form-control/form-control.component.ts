import { Component, Input } from '@angular/core';
import { FormControl } from './form-control.model';

@Component({
  selector: 'dg-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {

  @Input('dgFormControl') formControl: FormControl;
  @Input('dgFormName') formName: string;
  @Input() defaults: object;

  public constructor() {
  }

  get mergedDefaults(): object {
    if (!!this.formControl.componentDefaults) {
      return {...this.formControl.componentDefaults, ...this.defaults};
    }
    return this.defaults;
  }

  // getColumnRange(): number[] {
  //   if (this.formControl.type === 'columns') { // FIXME constant
  //     return Array(this.formControl['columns'].length).fill(0).map((x, i) => i);
  //   }
  // }

}
