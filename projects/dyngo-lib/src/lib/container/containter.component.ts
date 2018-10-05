import {Component, Input, OnInit} from '@angular/core';
import {Container} from './container.model';
import {FormService} from '../form/form.service';
import {DyngoFormControl} from '../form-control/form-control.model';

@Component({
  selector: 'dg-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent implements OnInit {

  @Input('dgContainer') container: Container;
  @Input('dgFormName') formName: string;
  data: any;

  public constructor(private formService: FormService) {}

  public ngOnInit(): void {
    this.data = this.formService.getForm(this.formName).data;
  }

  public isControlVisible(formControl: DyngoFormControl): boolean {
    const visibilityExpression: string = formControl.constraints ? formControl.constraints['visible'] : undefined;
    return this.formService.evaluateExpression(visibilityExpression, this.data);
  }

}
