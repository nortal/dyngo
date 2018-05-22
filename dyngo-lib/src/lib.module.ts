import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './container/containter.component';
import { FormComponent } from './form';
import {
  CheckboxControl,
  HeaderControl,
  NumberInputControl,
  RadioControl,
  SelectControl,
  StaticTextControl,
  TextInputControl
} from './form-control';
import { BaseFormControl } from './form-control/base-form-control';
import { FormControlComponent } from './form-control/form-control.component';
import { DateInputControl } from './form-control/input/date-input.control';
import { ChecklistDirective } from './form-control/select/checklist.directive';

import { FormService } from './form';
import { TranslationService } from './translation';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    FormComponent, ContainerComponent, FormControlComponent, BaseFormControl,
    TextInputControl, NumberInputControl, DateInputControl,
    SelectControl, CheckboxControl, RadioControl,
    HeaderControl, StaticTextControl,
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
