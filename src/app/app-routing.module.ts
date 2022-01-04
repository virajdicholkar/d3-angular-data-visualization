import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
