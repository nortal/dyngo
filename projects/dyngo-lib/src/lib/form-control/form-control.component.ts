import {Component, Input} from '@angular/core';
import {DyngoFormControl} from './form-control.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'dg-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {

  @Input('dgFormControl') formControl: DyngoFormControl;
  @Input('dgFormName') formName: string;
  @Input() defaults: any;
  @Input() fGroup: FormGroup;

  public constructor() {
  }

}
