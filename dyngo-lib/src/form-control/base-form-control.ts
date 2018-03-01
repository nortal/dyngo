import {Component, Input, OnInit} from '@angular/core';
import {FormService} from '../form';
import {TranslationService} from '../translation/translation.service';
import {FormControl} from './form-control.model';

@Component({
  selector: 'ng-base-form-control',
  template: '<div>This is base form control.</div>'
})
export class BaseFormControl implements OnInit {

  @Input('dgFormControl') public formControl: FormControl;
  @Input('dgFormName') formName: string;
  data: any;
  lang: string;

  public constructor(private formService: FormService, private translationService: TranslationService) {}

  public ngOnInit(): void {
    let form = this.formService.getForm(this.formName);
    this.data = form.data;
    this.lang = form.lang;
    if (!this.data[this.formControl.id] && !!this.formControl.defaultValue) {
      this.data[this.formControl.id] = this.formControl.defaultValue;
    }
  }

  public translate(localizedValue: { [key: string]: any }): string {
    let translatedValue = this.translationService.translate(this.formName, localizedValue, this.lang);
    if (!translatedValue) {
      return;
    }
    return translatedValue.replace(/{{([^}]*)}}/g, (match, group) => {
      if (group == 'max()') {
        return <string>this.max();
      }
      if (group == 'min()') {
        return <string>this.min();
      }
      // Is it required? Or returning just group would be enough?
      return this.formService.evaluateExpression(group, this.data);
    });
  }

  public isDisabled() {
    return this.evaluateConstraint('disabled');
  }

  public isRequired() {
    return this.evaluateConstraint('required');
  }

  public min() {
    return this.evaluateConstraint('min');
  };

  public max() {
    return this.evaluateConstraint('max');
  };

  private evaluateConstraint(name: string): string | number | boolean {
    if (!this.formControl.constraints || !this.formControl.constraints[<any>name]) {
      return;
    }
    let constraintExpression = this.formControl.constraints[<any>name];
    if (typeof constraintExpression === 'string') {
      return this.formService.evaluateExpression(constraintExpression, this.data);
    } else if (typeof constraintExpression === 'number') {
      return constraintExpression;
    } else if (typeof constraintExpression === 'boolean') {
      return constraintExpression;
    }
  };

}
