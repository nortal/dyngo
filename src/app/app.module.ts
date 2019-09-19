import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DyngoModule } from 'projects/dyngo-lib/src/lib/lib.module';
import { DemoService } from 'src/app/demo.service';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DyngoModule.forRoot(),
    DateInputsModule,
    BrowserAnimationsModule,
    InputsModule
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
