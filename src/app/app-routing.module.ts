import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';

const routes: Routes = [{
  path: '',
  pathMatch:'full',
  redirectTo: '/line-chart'
},
{
  path: 'line-chart',
  component: LineChartComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
