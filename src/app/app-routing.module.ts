import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MultiLineComponentComponent } from './multi-line-component/multi-line-component.component';

const routes: Routes = [{
  path: '',
  pathMatch:'full',
  redirectTo: '/multi-line-chart'
},
{
  path: 'line-chart',
  component: LineChartComponent
},
{
  path: 'multi-line-chart',
  component: MultiLineComponentComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
