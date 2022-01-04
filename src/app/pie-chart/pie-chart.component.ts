import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent extends BaseChartComponent {

  radius;
  arc: any;
  outerArc: any;
  pie: any;
  circle: any;
  slices: any;
  labels: any;
  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  afterDrawChart(): void {
    this.addlabels()
  }

  setSVG(): void {
    super.setSVG()
    this.radius = 400;
    this.graph.attr('transform', `translate(${this.radius}, ${this.radius})`)
  }

  defineScale(): void {
    this.setColorScale();
    this.arc = this.d3.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(0);

    this.outerArc = this.d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius * 0.83);
  }

  drawChart(): void {
    this.pie = this.d3.pie()
      .sort(null)
      .value(function (d: any) {
        return d.population;
      })

    this.circle = this.graph.append("g")
      .attr("class", "circle")

    const path = this.circle
      .selectAll('path')
      .data(this.pie(this.data as any))

    this.slices = path
      .enter()
      .append('path')
      .attr('class', 'slice')

    const self = this;
    this.slices
      .attr('fill', (d: any) => this.colorScale(`${d.data.year}`) as any)
      .attr('d', this.arc as any)
      .classed('donut-slice', true)
      .each(function (this: any, d: any) {
        this._current = d;
      })
      .transition().duration(1000)
      .attrTween("d", function (d) {
        const t = (this as any)
        t._current = t._current || d;
        console.log(t._current)
        const interpolate = self.d3.interpolate(t._current, d as any);
        t._current = interpolate(0);
        return function (t) {
          return self.arc(interpolate(t) as any);
        };
      })

    this.slices.merge(path)
      .on('mouseover', function (this: any) {
        self.d3
          .select(this)
          .transition()
          .duration(300)
          .attr('d', self.outerArc);
      })
      .on('mouseout', function () {
        self
          .d3
          .select(this)
          .transition()
          .duration(300)
          .ease(self.d3.easeBack)
          .attr('d', self.arc);
      })
  }

  addlabels() {
    const key = function (d) {
      console.log('d=====>', d)
      return d.data.year;
    };

    this.labels = this.graph.append("g")
      .attr("class", "labels");

    const text = this.labels.selectAll("text")
      .data(this.pie(this.data as any), key);

    console.log('text', text)

    const labelArc = this.d3.arc()
      .innerRadius(this.radius * 0.5)
      .outerRadius(this.radius * 0.7);
    const totalPopulation = this.d3.sum(this.data, (d) => d.population);
    const labels = text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function (d: any) {
        console.log('d', d)
        return `${Math.round(100 * d.value / totalPopulation)}%`;
      })
      .attr("transform", (d, i) => {
        const pos = labelArc.centroid(d);
        return `translate(${pos})`
      })
      .attr("font-size", "23px")
      .attr("font-weight", "900")
  }
}
