// import {FormService} from '@dyngo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormService } from 'projects/dyngo-lib/src/lib/form/form.service';
import { FormioForm } from 'projects/dyngo-lib/src/lib/model';
// import {FORM} from '../form';
// import {FormioForm} from '../../dyngo-lib/src/model';
import { Observable, of } from 'rxjs';
import { FORM } from 'src/app/form';
import { SCH_FORM } from 'src/app/schedule-form';

// import {SCH_FORM} from '../schedule-form';


@Injectable()
export class DemoService {

  constructor(private formService: FormService, private httpClient: HttpClient) {
  }

  public initWithBuiltInForm(formData: any): Observable<FormioForm> {
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
    form.data['employedTo'] = '2018-09-27T21:00:00.000Z';
    this.formService.registerForm('demoForm', form);
    return of(form);
  }

  // public init(rootContainer: any, formData: any): void {
  //   const form = new Form(rootContainer, 'en');
  //   // form.dictionary = this.rootContainer.dictionary;
  //   form.data = formData;
  //   // this.formService.registerForm('demoForm', form);
  // }

}
