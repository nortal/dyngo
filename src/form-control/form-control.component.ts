import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from './form-control.model';
import {FormService} from '../form';

@Component({
  selector: 'dg-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent implements OnInit {

  @Input('dgFormControl') formControl: FormControl;
  @Input('dgFormName') formName: string;

  public constructor(private formService: FormService) {
  }

  public ngOnInit(): void {
    // console.log('form=' + this.formName + '; lang=' + this.formLang + '; fc=' + this.formControl + '; data=' + this.data);
  }

}
