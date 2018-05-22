import {Component, Input} from '@angular/core';
import {FormControl} from './form-control.model';

@Component({
  selector: 'dg-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {

  @Input('dgFormControl') formControl: FormControl;
  @Input('dgFormName') formName: string;

  public constructor() {
  }

}
