import {Component, Input, OnInit} from '@angular/core';
import {Form} from './form.model';
import {FormService} from './form.service';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'dg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  @Input() name: string;
  @Input() lang: string;
  form: Form;
  public data: any;

  public constructor(private formService: FormService) {}

  public ngOnInit(): void {
    this.form = this.formService.getForm(this.name);
    this.data = this.form.data;
  }

  public onSubmit(df: NgForm): void {
    console.log('onSubmit', df);
  }

}
