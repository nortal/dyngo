import {Injectable} from '@angular/core';
import {FormService} from '../form/form.service';

@Injectable()
export class DefaultControlProviderService {

  public constructor(private formService: FormService) {
    formService.registerElementType('textInput', {
      group: 'Default',
      label: 'Text Input'
    });
    formService.registerElementType('numberInput', {
      group: 'Default',
      label: 'Number Input'
    });
    formService.registerElementType('checkbox', {
      group: 'Default',
      label: 'Checkbox',
      layout: {orientation: 'vertical'},
    });
    formService.registerElementType('radio', {
      group: 'Default',
      label: 'Radio',
      layout: {orientation: 'vertical'}
    });

    formService.registerElementType('select', {
      group: 'Default',
      label: 'Select'
    });
    formService.registerElementType('header', {
      group: 'static-controls'
    });
    formService.registerElementType('staticText', {
      group: 'static-controls'
    });
    formService.registerElementType('hidden', {
      group: 'Default'
    });

    formService.registerElementType('panel', {
      group: 'containers'
    });
  }

}
