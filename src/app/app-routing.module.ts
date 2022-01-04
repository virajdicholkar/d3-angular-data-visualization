import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MultiLineComponentComponent } from './multi-line-component/multi-line-component.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/line-chart'
},
{
  path: 'line-chart',
  component: LineChartComponent
},
{
  path: 'multi-line-chart',
  component: MultiLineComponentComponent
},
{
  path: 'pie-chart',
  component: PieChartComponent
},
{
  path: 'bar-chart',
  component: BarChartComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
