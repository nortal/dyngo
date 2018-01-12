import {Component, Input, OnInit} from '@angular/core';
import {Container} from './container.model';
import {FormService} from '../form';
import {FormControl} from '../form-control/form-control.model';


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

  public isControlVisible(formControl: FormControl): boolean {
    let visibilityExpression: string = formControl.constraints ? formControl.constraints[<any>'visible'] : undefined;
    if (!visibilityExpression) {
      return true;
    }
    let keys: string[] = [];
    let values: any[] = [];
    for (let key of Object.keys(this.data)) {
      if (key === 'this') {
        continue;
      }
      keys.push(key);
      values.push(this.data[key])
    }
    try {
      return new Function(...keys, 'return ' + visibilityExpression).apply(null, values);
    } catch (e) {
      console.error('Failed to evaluate expression', visibilityExpression, e);
    }
  }

}
