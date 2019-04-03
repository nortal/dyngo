import {Component, Input, OnInit} from '@angular/core';
import {DyngoFormControl} from './form-control.model';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form/form.service';
import {FormioForm} from '../model';

@Component({
  selector: 'dg-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent implements OnInit {

  @Input('dgFormControl') formControl: DyngoFormControl;
  @Input('dgFormName') formName: string;
  @Input() defaults: any;
  @Input() fGroup: FormGroup;

  form: FormioForm;

  public constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.form = this.formService.getForm(this.formName);
  }

  public isControlVisible(formControl: DyngoFormControl): boolean {
    return this.formService.isControlVisible(this.form, formControl, this.form.data);
  }

}
