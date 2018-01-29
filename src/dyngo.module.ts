import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FormService} from './form/form.service';
import {TranslationService} from './translation/translation.service';
import {FormComponent} from './form';
import {ContainerComponent} from './container/containter.component';
import {FormControlComponent} from './form-control/form-control.component';
import {
  CheckboxControl, HeaderControl, NumberInputControl, RadioControl, SelectControl, StaticTextControl,
  TextInputControl
} from './form-control';
import {ChecklistDirective} from './form-control/select/checklist.directive';
import {BaseFormControl} from './form-control/base-form-control';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  providers: [
    FormService, TranslationService
  ],
  declarations: [
    FormComponent, ContainerComponent, FormControlComponent, BaseFormControl,
    TextInputControl, NumberInputControl,
    SelectControl, CheckboxControl, RadioControl,
    HeaderControl, StaticTextControl,
    ChecklistDirective
  ],
  exports: [
    FormComponent
  ]
})
export class DyngoModule {
}
