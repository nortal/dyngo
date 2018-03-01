import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DyngoModule } from '@dyngo';
import { DemoService } from 'app/demo.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DyngoModule.forRoot()
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
