import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormService} from '../form/form.service';
import {FormControl} from './form-control.model';
import {TranslationService} from '../form/translation.service';

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

  public constructor(private formService: FormService, private translationService: TranslationService) {
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
    if (!!this.defaults && !!this.defaults.label && !!this.defaults.label.width) {
      return this.defaults.label.width;
    }
    return BaseFormControl.DEFAULT_LABEL_WIDTH;
  }

  get labelTextAlign(): string {
    if (!!this.defaults && !!this.defaults.label && !!this.defaults.label.textAlign) {
      return this.defaults.label.textAlign;
    }
    return BaseFormControl.DEFAULT_LABEL_ALIGN;
  }

  get controlWidth(): number {
    if (!!this.defaults && !!this.defaults.control && !!this.defaults.control.width) {
      return this.defaults.control.width;
    }
    return BaseFormControl.DEFAULT_CONTROL_WIDTH;
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

  onClick(event: Event): void {
    if (!!this.defaults && this.defaults.selectTextOnFocus) {
      const inputElem = <HTMLInputElement>event.target;
      inputElem.select();
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
