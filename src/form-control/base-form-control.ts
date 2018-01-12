import {Component, Input, OnInit} from '@angular/core';
import {FormService} from '../form';
import {TranslationService} from '../translation/translation.service';
import {FormControl} from './form-control.model';

@Component({})
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
  }

  public translate(value: {[key: string]:any}): string {
    let translatedValue = this.translationService.translate(this.formName, value, this.lang);
    if (!translatedValue) {
      return;
    }
    return translatedValue.replace(/{{([^}]*)}}/g, (match, group) => {
      console.log(match, group);
      if (group == 'max()') {
        console.log('returning max()');
        return <string>this.max();
      }
      if (group == 'min()') {
        console.log('returning min()');
        return <string>this.min();
      }
      console.log('Uknown value', group);
      return 'foobar';
      // return $scope.$eval(group, $scope.data);
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

  private evaluateConstraint(name: string) {
    if (!this.formControl.constraints || !this.formControl.constraints[<any>name]) {
      return;
    }
    let constraintExpression = this.formControl.constraints[<any>name];
    if (typeof constraintExpression === 'string') {
      // return $scope.$eval(constraintExpression, $scope.data);
      return 'fixme!!'; //FIXME
    } else if (typeof constraintExpression === 'number') {
      return constraintExpression;
      } else if (typeof constraintExpression === 'boolean') {
        return constraintExpression;
    }
  };

}
