import {Component, OnInit} from '@angular/core';
import {DemoService} from './demo.service';
import {HttpClient} from '@angular/common/http';
import {Form} from '../../../../src/form/form.model';

@Component({
  selector: 'demo-app',
  template: `
    <div class="card card mt-5">
      <h5 class="card-header">Dynamic form definition
        <span class="float-right">
          edit:&nbsp;
          <input type="checkbox" [(ngModel)]="editStructure">&nbsp;structure
          <input type="checkbox" [(ngModel)]="editDictionary">&nbsp;dictionary
        </span>
      </h5>
      <div class="card-body" *ngIf="editStructure || editDictionary">

        <div class="container" *ngIf="editStructure">
          <div class="alert alert-danger" role="alert" *ngIf="structureError">
            Failed to update form structure: {{structureError}}
          </div>
          <div class="form-group">
            <label for="structureJson">Structure</label>
            <textarea class="form-control" id="structureJson" cols="50" rows="30"
                      [(ngModel)]="structureJson"></textarea>
          </div>
          <a href="#" class="btn btn-primary" (click)="updateFormStructure()">Update structure</a>
        </div>

        <div class="container" *ngIf="editDictionary">
          <div class="alert alert-danger" role="alert" *ngIf="dictionaryError">
            Failed to update form dictionary: {{dictionaryError}}
          </div>
          <div class="form-group">
            <label for="dictionaryJson">Dictionary</label>
            <textarea class="form-control" id="dictionaryJson" cols="50" rows="10"
                      [(ngModel)]="dictionaryJson"></textarea>
          </div>
          <a href="#" class="btn btn-primary" (click)="updateDictionary()">Update dictionary</a>
        </div>

      </div>

    </div>

    <div class="card card mt-5">
      <h5 class="card-header">Dynamic form demo</h5>
      <div class="card-body">

        <div class="container">
          <dg-form name="demoForm" lang="en" *ngIf="form"></dg-form>
        </div>

        <!--<a href="#" class="btn btn-primary">Submit</a>-->
      </div>
    </div>

    <div class="card mt-5 mb-5">
      <h5 class="card-header">Form data</h5>
      <div class="card-body">
        <pre>{{formData | json}}</pre>
      </div>
    </div>
  `
})

export class AppComponent implements OnInit {

  public form: Form;
  public formData: any = {};

  public structureJson: string;
  public structureError: string;

  public dictionaryJson: string;
  public dictionaryError: string;

  constructor(private demoService: DemoService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.form = this.demoService.initWithBuiltInForm(this.formData);
    this.structureJson = this.toPrettyJson(this.form.rootContainer);
    this.dictionaryJson = this.toPrettyJson(this.form.dictionary);
    // this.formLoaded = true;
    // this.http.get('/api/forms/demo').subscribe((formStructure) => {
    // });
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
