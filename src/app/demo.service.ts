// import {FormService} from '@dyngo';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormService} from 'projects/dyngo-lib/src/lib/form/form.service';
import {DisplayOptions, FormioForm} from 'projects/dyngo-lib/src/lib/model';
// import {FORM} from '../form';
// import {FormioForm} from '../../dyngo-lib/src/model';
import {Observable, of} from 'rxjs';
import {SCH_FORM} from 'src/app/schedule-form';
import {DyngoFormControl} from '../../projects/dyngo-lib/src/lib/form-control/form-control.model';

// import {SCH_FORM} from '../schedule-form';


@Injectable()
export class DemoService {

  constructor(private formService: FormService, private httpClient: HttpClient) {
  }

  public initWithBuiltInForm(formData: { [key: string]: any }, previousData?: { [key: string]: any }): Observable<FormioForm> {
    // let form = new Form(this.rootContainer, 'en');
    // form.dictionary = this.dictionary;
    // form.data = formData;
    // // this.formService.registerForm('demoForm', form);
    // return form;

    // return this.httpClient.get('https://examples.form.io/example')
    //   .pipe(tap(f => this.formService.registerForm('demoForm', f)));

    const form: FormioForm = SCH_FORM;
    // const form: FormioForm = SCH_FORM;
    form.data = formData;
    form.previousData = previousData;
    form.diffFormatter = this.formatDiff;
    form.previousValueFormatter = this.formatPreviousValue;
    form.displayOptions = this.conditional;
    form.readonly = false;
    this.formService.registerForm('demoForm', form);
    return of(form);
  }

  private formatPreviousValue(control: DyngoFormControl, value: any): string {
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

  private formatDiff(control: DyngoFormControl, oldValue: any, newValue: any): string {
    if (isNaN(oldValue) || isNaN(newValue)) {
      return;
    }
    if (control.type === 'number') {
      return `Adjusted: ${newValue - oldValue}`;
    }
  }

  private conditional(control: DyngoFormControl, formData: any): DisplayOptions {
    if (control.key === 'severance') {
      return Object.assign(new DisplayOptions(), {showInput: false, showDiff: false});
    }
  }

// public init(rootContainer: any, formData: any): void {
  //   const form = new Form(rootContainer, 'en');
  //   // form.dictionary = this.rootContainer.dictionary;
  //   form.data = formData;
  //   // this.formService.registerForm('demoForm', form);
  // }

}
