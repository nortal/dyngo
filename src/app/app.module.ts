import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DyngoModule } from 'projects/dyngo-lib/src/lib/lib.module';
import { DemoService } from 'src/app/demo.service';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DyngoModule.forRoot()
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
