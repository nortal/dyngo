import {Injectable} from '@angular/core';
import {FormioForm} from '../model';

@Injectable()
export class FormService {

  private forms: any = {};
  private elementTypes: { [key: string]: any } = {};

  public registerForm(name: string, form: FormioForm) {
    if (!!name && !!form) {
      this.forms[name] = form;
    }
  }

  public unregisterForm(name: string) {
    if (!!name) {
      delete this.forms[name];
    }
  }

  public getForm(formName: string): FormioForm {
    if (!this.forms[formName]) {
      console.error('Form "' + formName + '" is not registered!');
    }
    return this.forms[formName];
  }

  public registerElementType(type: string, element: any) {
    if (!type || !element) {
      return;
    }
    if (!this.elementTypes[type]) {
      this.elementTypes[type] = element;
    }
  }

  public evaluateExpression(expression: string, data: any): any {
    if (!expression) {
      return true;
    }
    let keys: string[] = [];
    let values: any[] = [];
    for (let key of Object.keys(data)) {
      if (key === 'this') {
        continue;
      }
      keys.push(key);
      values.push(data[key]);
    }
    try {
      return new Function(...keys, 'return ' + expression).apply(null, values);
    } catch (e) {
      console.error('Failed to evaluate expression', expression, e.message);
    }
  }

}

