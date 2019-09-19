import {Component, OnInit} from '@angular/core';
import {BaseFormControl} from '../base-form-control';

@Component({
  selector: 'dg-date-input',
  styleUrls: ['./input.control.css'],
  templateUrl: './date-input.control.html',
})
export class DateInputControl extends BaseFormControl implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
    if (!!this.data[this.formControl.id] && typeof this.data[this.formControl.id] === 'string') {
      this.data[this.formControl.id] = this.intlService.parseDate(this.data[this.formControl.id]);
    }
  }

}
