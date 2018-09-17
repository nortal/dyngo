import {Component, Input, OnInit} from '@angular/core';
import {FormService} from '../form/form.service';
import {FormControl} from './form-control.model';
import {TranslationService} from '../form/translation.service';
import {IntlService} from "@progress/kendo-angular-intl";

@Component({
  selector: 'dg-base-form-control',
  template: '<div>This is base form control.</div>'
})
export class BaseFormControl implements OnInit {

  static DEFAULT_LABEL_WIDTH = 4;
  static DEFAULT_LABEL_ALIGN = 'left';
  static DEFAULT_CONTROL_WIDTH = 8;

  @Input('dgFormControl') public formControl: FormControl;
  @Input('dgFormName') formName: string;
  @Input() defaults: any;
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

  public translate(value: string): string {
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
    return this.formControl.disabled;
  }

  public isRequired() {
    return this.evaluateConstraint('required');
  }

  public min() {
    return this.evaluateConstraint('min');
  }

  public max() {
    return this.evaluateConstraint('max');
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
