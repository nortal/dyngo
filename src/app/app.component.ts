import {Component, OnInit, ViewChild} from '@angular/core';
import {FormComponent, FormioForm} from 'projects/dyngo-lib/src/public_api';
import {DemoService} from './demo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public form: FormioForm;
  public formData: {[key: string]: any} = {severance: 100500, employeeCode: 'FOOBAR', employeeId: 'BAZ', calculationMethod: 'XXX', employedFrom: new Date()};
  public previousData: {[key: string]: any} = {severance: 876230, resident: 'yes', employeeCode: 'BAZQUX', commission: 0, employedFrom: new Date('2018/12/7')};

  public structureJson: string;
  public structureError: string;

  public dictionaryJson: string;
  public dictionaryError: string;

  @ViewChild('dgForm') dgForm: FormComponent;

  constructor(private demoService: DemoService) {

  }

  ngOnInit(): void {
    this.demoService.initWithBuiltInForm(this.formData, this.previousData)
      .subscribe(f => this.form = f);
    // this.form.submitCallback = () => console.log('submit callback called');
    // this.structureJson = this.toPrettyJson(this.form.rootContainer);
    // this.dictionaryJson = this.toPrettyJson(this.form.dictionary);
  }

  toPrettyJson(obj: any): string {
    return JSON.stringify(obj, undefined, 4);
  }

  public updateFormStructure() {
    delete this.structureError;
    // try {
      // this.form.rootContainer = JSON.parse(this.structureJson);
    // } catch (e) {
    //   this.structureError = e;
    // }
  }

  public updateDictionary() {
    delete this.dictionaryError;
    // try {
    //   this.form.dictionary = JSON.parse(this.dictionaryJson);
    // } catch (e) {
    //   this.dictionaryError = e;
    // }
  }

  submit(): void {
    console.log('submitted', this.dgForm.getValue());
  }


}
