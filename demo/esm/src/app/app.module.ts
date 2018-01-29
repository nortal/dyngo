import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DyngoModule} from '../../lib/dyngo.module';
import {DemoService} from './demo.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, HttpClientModule, DyngoModule],
  declarations: [AppComponent],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
