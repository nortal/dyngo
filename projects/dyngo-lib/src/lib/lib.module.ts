import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ContainerComponent} from './container/containter.component';
import {FormComponent} from './form/form.component';
import {BaseFormControl} from './form-control/base-form-control';
import {FormControlComponent} from './form-control/form-control.component';
import {DateInputControl} from './form-control/input/date-input.control';
import {ChecklistDirective} from './form-control/select/checklist.directive';

import {FormService} from './form/form.service';
import {TranslationService} from './form/translation.service';
import {TextInputControl} from './form-control/input/text-input.control';
import {NumberInputControl} from './form-control/input/number-input.control';
import {HeaderControl} from './form-control/static/header.control';
import {StaticTextControl} from './form-control/static/static-text.control';
import {SelectControl} from './form-control/select/select.control';
import {RadioControl} from './form-control/select/radio.control';
import {CheckboxControl} from './form-control/select/checkbox.control';
import {TextAreaControl} from './form-control/input/text-area-control.component';
import {HiddenInputControl} from './form-control/input/hidden-input.control';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {InputsModule} from '@progress/kendo-angular-inputs';


@NgModule({
  imports: [
    CommonModule, FormsModule,
    DateInputsModule, InputsModule
  ],
  declarations: [
    FormComponent, ContainerComponent, FormControlComponent, BaseFormControl,
    TextInputControl, NumberInputControl, DateInputControl, TextAreaControl,
    SelectControl, CheckboxControl, RadioControl,
    HeaderControl, StaticTextControl, HiddenInputControl,
    ChecklistDirective
  ],
  exports: [
    FormComponent
  ]
})
export class DyngoModule {

  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: DyngoModule,
      providers: [
        FormService, TranslationService
      ]
    };
  }
}
