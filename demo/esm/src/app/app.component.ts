import {Component} from '@angular/core';
import {DemoService} from './demo.service';

@Component({
  selector: 'demo-app',
  template: `
    <div class="card card mt-5">
      <h5 class="card-header">Dynamic form demo</h5>
      <div class="card-body">

        <div class="container">
          <dg-form name="demoForm" lang="en"></dg-form>
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
export class AppComponent {

  public formData: any = {};

  constructor(demoService: DemoService) {
    demoService.init(this.formData);
  }

}
