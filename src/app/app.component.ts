import { Component, OnInit } from '@angular/core';
import { Form } from '@dyngo';
import { DemoService } from './demo.service';


@Component({
  selector: 'dg-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  public form: Form;
  public formData: any = {};

  public structureJson: string;
  public structureError: string;

  public dictionaryJson: string;
  public dictionaryError: string;

  constructor(private demoService: DemoService) {

  }

  ngOnInit(): void {
    this.form = this.demoService.initWithBuiltInForm(this.formData);
    this.form.submitCallback = () => console.log('submit callback called');
    this.structureJson = this.toPrettyJson(this.form.rootContainer);
    this.dictionaryJson = this.toPrettyJson(this.form.dictionary);
  }

  toPrettyJson(obj: any): string {
    return JSON.stringify(obj, undefined, 4);
  }

  public updateFormStructure() {
    delete this.structureError;
    try {
      this.form.rootContainer = JSON.parse(this.structureJson);
    } catch (e) {
      this.structureError = e;
    }
  }

  public updateDictionary() {
    delete this.dictionaryError;
    try {
      this.form.dictionary = JSON.parse(this.dictionaryJson);
    } catch (e) {
      this.dictionaryError = e;
    }
  }


}
