import {Component, OnInit, ViewChild} from '@angular/core';
import {FormComponent, FormioForm} from 'projects/dyngo-lib/src/public_api';
import {DemoService} from './demo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public form: FormioForm;
  public formData: { [key: string]: any } = {
    severance: 100500,
    employeeCode: 'FOOBAR',
    employeeId: 'BAZ',
    calculationMethod: 'XXX',
    employedFrom: new Date()
  };
  public previousData: { [key: string]: any } = {
    severance: 876230,
    resident: 'yes',
    employeeCode: 'BAZQUX',
    commission: 0,
    employedFrom: new Date('2018/12/7')
  };

  @ViewChild('dgForm') dgForm: FormComponent;

  constructor(private demoService: DemoService) {
  }

  ngOnInit(): void {
    this.demoService.initWithBuiltInForm(this.formData, this.previousData).subscribe(f => this.form = f);
  }

  submit(): void {
    console.log('Form submitted', this.dgForm.getValue());
  }

}
