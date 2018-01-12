import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DyngoModule} from '../../lib/dyngo.module';
import {DemoService} from './demo.service';

@NgModule({
  imports: [BrowserModule, DyngoModule],
  declarations: [AppComponent],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
