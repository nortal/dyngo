import {Injectable} from '@angular/core';
import {Form} from './form.model';

@Injectable()
export class FormService {

  private forms: any = {};
  private elementTypes: { [key: string]: any } = {};

  public registerForm(name: string, form: Form) {
    if (!!name && !!form) {
      this.forms[name] = form;
    }
  };

  public getForm(formName: string): Form {
    if (!this.forms[formName]) {
      console.log('Form "' + formName + '" is not registered!');
    }
    return this.forms[formName];
  };

  public registerElementType(type: string, element: any) {
    if (!type || !element) {
      return;
    }
    if (!this.elementTypes[type]) {
      this.elementTypes[type] = element;
    }
  };


}
