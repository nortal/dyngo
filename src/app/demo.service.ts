import {Injectable} from '@angular/core';
import {FormService} from 'projects/dyngo-lib/src/lib/form/form.service';
import {DisplayOptions, FormioForm} from 'projects/dyngo-lib/src/lib/model';
import {Observable, of} from 'rxjs';
import {DEMO_FORM} from 'src/app/schedule-form';
import {DyngoFormControl} from '../../projects/dyngo-lib/src/lib/form-control/form-control.model';

@Injectable()
export class DemoService {

  constructor(private formService: FormService) {
  }

  public initWithBuiltInForm(formData: { [key: string]: any }, previousData?: { [key: string]: any }): Observable<FormioForm> {
    const form: FormioForm = DEMO_FORM;
    form.data = formData;
    form.previousData = previousData;
    form.diffFormatter = this.diffFormatter;
    form.previousValueFormatter = this.previousValueFormatter;
    form.displayOptions = this.displayOptions;
    form.readonly = false;
    this.formService.registerForm('demoForm', form);
    return of(form);
  }

  private previousValueFormatter(control: DyngoFormControl, value: any): string {
    if (value === undefined || value === null) {
      return;
    }
    let formatted: string;
    switch (control.type) {
      case 'datetime':
        formatted = (<Date>value).toLocaleDateString();
        break;
      case 'number':
        formatted = (<Number>value).toFixed(2);
        break;
      case 'radio':
        formatted = control.values.filter(v => v.value === value)[0].label;
        break;
    }
    return `Previous: ${formatted}`;
  }

  private diffFormatter(control: DyngoFormControl, oldValue: any, newValue: any): string {
    if (isNaN(oldValue) || isNaN(newValue)) {
      return;
    }
    if (control.type === 'number') {
      return `Adjusted: ${newValue - oldValue}`;
    }
  }

  private displayOptions(control: DyngoFormControl, formData: any): DisplayOptions {
    if (control.key === 'severance') {
      return Object.assign(new DisplayOptions(), {showInput: false, showDiff: false});
    }
  }
}
