import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { MultiLineComponentComponent } from './multi-line-component/multi-line-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    BaseChartComponent,
    MultiLineComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
