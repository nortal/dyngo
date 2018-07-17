import {Component, Input, OnInit} from '@angular/core';
import {FormService} from './form.service';
import {NgForm} from '@angular/forms';
import {FormioForm} from '../model';

@Component({
  selector: 'dg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  @Input() name: string;
  @Input() lang: string;
  form: FormioForm;
  public data: any;

  public constructor(private formService: FormService) {
  }

  public ngOnInit(): void {
    this.form = this.formService.getForm(this.name);
    this.data = this.form.data;
  }

  public onSubmit(df: NgForm): void {
    // if (this.form.submitCallback) {
    //   this.form.submitCallback();
    // }
  }

}
