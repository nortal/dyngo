import {Component, Input, OnInit} from '@angular/core';
import {FormService} from '../form/form.service';
import {TranslationService} from '../form/translation.service';
import {IntlService} from '@progress/kendo-angular-intl';
import {FormControl, FormGroup, Validator, ValidatorFn, Validators} from '@angular/forms';
import {DyngoFormControl} from './form-control.model';

@Component({
  selector: 'dg-base-form-control',
  template: '<div>This is base form control.</div>'
})
export class BaseFormControl implements OnInit {

  static DEFAULT_LABEL_WIDTH = 4;
  static DEFAULT_LABEL_ALIGN = 'left';
  static DEFAULT_CONTROL_WIDTH = 8;

  @Input('dgFormControl') public formControl: DyngoFormControl;
  @Input('dgFormName') formName: string;
  @Input() defaults: any;
  @Input() fGroup: FormGroup;
  data: any;
  lang: string;

  public constructor(private formService: FormService, protected intlService: IntlService, private translationService: TranslationService) {
  }

  public ngOnInit(): void {
    const form = this.formService.getForm(this.formName);
    this.data = form.data;
    this.lang = 'en'; // form.lang;
    this.formControl.id = this.formControl.key; // TODO: temporary hack, replace 'id' with 'key'
    if (!this.data[this.formControl.id] && !!this.formControl.defaultValue) {
      this.setDefaultValue(this.formControl.defaultValue);
    }
    const control = new FormControl({value: this.data[this.formControl.id], disabled: this.isDisabled()},
      Validators.compose(this.getValidators()));
    this.fGroup.addControl(this.formControl.id, control);
  }

  getValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (this.isRequired()) {
      validators.push(Validators.required);
    }
    return validators;
  }

  setDefaultValue(value: any): void {
    this.data[this.formControl.id] = Number(this.formControl.defaultValue);
  }

  get labelWidth(): number {
    if (!this.formControl.labelWidth) {
      return BaseFormControl.DEFAULT_LABEL_WIDTH;
    }
    // calculate bootstrap units
    return Math.round(12 * this.formControl.labelWidth / 100.0);
  }

  get labelTextAlign(): string {
    if (!this.formControl.labelPosition) {
      return BaseFormControl.DEFAULT_LABEL_ALIGN;
    }
    return this.formControl.labelPosition.split('-')[1];
  }

  get controlWidth(): number {
    if (!this.formControl.labelWidth) {
      return BaseFormControl.DEFAULT_CONTROL_WIDTH;
    }
    // calculate bootstrap units
    return Math.round(12 * (100 - this.formControl.labelWidth) / 100.0);
  }

  public translate(value: string, params?: any): string {
    return value; // TODO
  }

  // public translate(localizedValue: { [key: string]: any }): string {
  //   const translatedValue = this.translationService.translate(this.formName, localizedValue, this.lang);
  //   if (!translatedValue) {
  //     return;
  //   }
  //   return translatedValue.replace(/{{([^}]*)}}/g, (match, group) => {
  //     if (group == 'max()') {
  //       return <string>this.max();
  //     }
  //     if (group == 'min()') {
  //       return <string>this.min();
  //     }
  //     // Is it required? Or returning just group would be enough?
  //     return this.formService.evaluateExpression(group, this.data);
  //   });
  // }

  public isDisabled(): boolean {
    const form = this.formService.getForm(this.formName);
    return form.readonly || this.formControl.disabled;
  }

  public isRequired() {
    return this.formControl.validate.required;
  }

  public min() {
    if (!!this.formControl.validate && this.formControl.validate.min !== '') {
      return this.formControl.validate.min;
    }
    // TODO
    // return this.evaluateConstraint('min');
  }

  public max() {
    if (!!this.formControl.validate && this.formControl.validate.max !== '') {
      return this.formControl.validate.max;
    }
    // TODO
    // return this.evaluateConstraint('max');
  }

  private evaluateConstraint(name: string): string | number | boolean {
    if (!this.formControl.constraints || !this.formControl.constraints[<any>name]) {
      return;
    }
    const constraintExpression = this.formControl.constraints[<any>name];
    if (typeof constraintExpression === 'string') {
      return this.formService.evaluateExpression(constraintExpression, this.data);
    } else if (typeof constraintExpression === 'number') {
      return constraintExpression;
    } else if (typeof constraintExpression === 'boolean') {
      return constraintExpression;
    }
  }

}
