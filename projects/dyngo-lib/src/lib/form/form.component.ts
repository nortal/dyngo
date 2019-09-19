import {Component, Input, OnInit} from '@angular/core';
import {FormService} from './form.service';
import {FormGroup} from '@angular/forms';
import {FormioForm} from '../model';
import {DyngoFormControl} from '../form-control/form-control.model';

@Component({
  selector: 'dg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  @Input() name: string;
  @Input() lang: string;
  form: FormioForm;
  public data: any;

  fGroup: FormGroup;

  public constructor(private formService: FormService) {
  }

  public ngOnInit(): void {
    this.form = this.formService.getForm(this.name);
    this.data = this.form.data || {};
    this.fGroup = new FormGroup({});
  }

  public onSubmit(): void {
  }

  public isValid(): boolean {
    return this.fGroup.valid;
  }

  public isDirty(): boolean {
    return this.fGroup.dirty;
  }

  public isTouched(): boolean {
    return this.fGroup.touched;
  }

  public getValue(): any {
    return this.fGroup.value;
  }

  public patchValue(value: { [key: string]: any }): void {
    this.fGroup.patchValue(value);
  }

  public isControlVisible(formControl: DyngoFormControl): boolean {
    return this.formService.isControlVisible(this.form, formControl, this.data);
  }

}
