import {Component, Input, OnInit} from '@angular/core';
import {FormService} from '../form/form.service';
import {TranslationService} from '../form/translation.service';
import {IntlService} from '@progress/kendo-angular-intl';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DyngoFormControl} from './form-control.model';
import {DisplayOptions} from '../model';

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
  data: { [key: string]: any };
  previousData: { [key: string]: any };
  diffFormatter?: (control: DyngoFormControl, oldValue: any, newValue: any) => string;
  previousValueFormatter?: (control: DyngoFormControl, value: any) => string;
  formattedPreviousValue: string;
  formattedDiff: string;
  lang: string;
  displayOptions: DisplayOptions;

  public constructor(private formService: FormService, protected intlService: IntlService, private translationService: TranslationService) {
  }

  public ngOnInit(): void {
    const form = this.formService.getForm(this.formName);
    this.data = form.data;
    this.previousData = form.previousData;
    this.diffFormatter = form.diffFormatter;
    this.previousValueFormatter = form.previousValueFormatter;
    this.lang = 'en'; // TODO: use real value when translation mechanism is ready
    this.formControl.id = this.formControl.key; // TODO: temporary hack, replace 'id' with 'key'
    if (!this.data[this.formControl.id] && !!this.formControl.defaultValue) {
      this.setDefaultValue(this.formControl.defaultValue);
    }
    if (!!form.displayOptions) {
      this.displayOptions = form.displayOptions(this.formControl, this.data);
    }
    const control = new FormControl({value: this.data[this.formControl.id], disabled: this.isDisabled()},
      Validators.compose(this.getValidators()));
    if (!!this.previousData && !!this.diffFormatter) {
      this.formattedDiff = this.calculateAndFormatDiff(this.data[this.formControl.key]);
      control.valueChanges.subscribe(newValue => this.formattedDiff = this.calculateAndFormatDiff(newValue));
    }
    if (!!this.previousData && !!this.previousValueFormatter) {
      this.formattedPreviousValue = this.formatPreviousValue();
    }
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
    this.data[this.formControl.id] = this.formControl.defaultValue;
  }

  formatPreviousValue(): string {
    if (!this.displayOptions || this.displayOptions.showPreviousValue) {
      return this.previousValueFormatter(this.formControl, this.previousData[this.formControl.id]);
    }
  }

  calculateAndFormatDiff(newValue: any): string {
    if (!this.displayOptions || this.displayOptions.showDiff) {
      return this.diffFormatter(this.formControl, this.previousData[this.formControl.id], newValue);
    }
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
  }

  public max() {
    if (!!this.formControl.validate && this.formControl.validate.max !== '') {
      return this.formControl.validate.max;
    }
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
