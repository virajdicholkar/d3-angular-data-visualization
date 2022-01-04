import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-multi-line-component',
  templateUrl: './multi-line-component.component.html',
  styleUrls: ['./multi-line-component.component.scss']
})
export class MultiLineComponentComponent extends LineChartComponent {
  paths: any;
  selectedX = 1;
  selectedY = 2;
  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit()
    this.tooltip = this.d3.select(this.tooltipRef.nativeElement);
  }
  beforeDrawChart(): void {
    this.setColorScale()
    super.beforeDrawChart()
  }

  formatData(): void {
    super.formatData()
    const formattedData = [{
      name: 'Total',
      values: []
    }, {
      name: 'Male',
      values: []
    }];
    this.formattedData.forEach(d => {
      formattedData[0].values.push({
        year: d.year,
        population: d.population,
        color: this.colorScale(formattedData[0].name)
      })
      formattedData[1].values.push({
        year: d.year,
        population: d.male_population,
        color: this.colorScale(formattedData[1].name)
      })
    })
    this.formattedData = formattedData;
    console.log('this.formattedData', this.formattedData)
  }

  defineScale(): void {
    const valusArray = [...this.formattedData[0].values, ...this.formattedData[1].values];
    const xValues = valusArray.map(d => d.year)
    const yValues = valusArray.map(d => d.population)
    this.xScale = this.d3.scaleTime()
      .range([this.margin.left, this.width])
      .domain(this.d3.extent(xValues))

    this.yScale = this.d3.scaleLinear().range([this.height, 0])
      .domain([
        this.d3.min(yValues) - 5,
        this.d3.max(yValues) + 5
      ])
  }

  drawChart(): void {
    this.defineLine();
    this.series = this.graph
      .selectAll(".series")
      .data(this.formattedData)
      .enter()
      .append('g')
      .attr('class', 'series')

    this.paths = this.series
      .append("path")
      .attr("d", d => {
        console.log('d', d)
        return this.line(d.values as any)
      })
      .attr('fill', 'none')
      .attr('stroke', (d, i) => {
        console.log('d, i====>', d, i)
        console.log('this.colorScale(this.formattedData[i].name)', this.colorScale(this.formattedData[i].name))
        return this.colorScale(this.formattedData[i].name) as any
      })
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')

    const path = this.paths.nodes();
    const totalLength = [path[0].getTotalLength(), path[1].getTotalLength()];
    this.paths
      .attr("stroke-dasharray", (d, i) => {
        console.log('d, i', d, i)
        return totalLength[i] + " " + totalLength[i]
      })
      .attr("stroke-dashoffset", (d, i) => totalLength[i])
      .transition()
      .duration(1000)
      .ease(this.d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  }

  drawPointsAndLabels(): void {
    const self = this;
    this.pointsAndLabels = this.series
      .selectAll("mypoints")
      .data((s) => s.values)
      .enter()
      .append("g")

    this.pointsAndLabels
      .append("circle")
      .attr("fill", function (d, i) {
        console.log('d, i', d, i)
        return d.color
      })
      .attr("stroke", "none")
      .attr("cx", (d) => this.getX(d))
      .attr("cy", (d) => self.getY(d))
      .attr("r", 5)
    this.pointsAndLabels.on('mouseover', function (event, currentPoint) {
      console.log('d, i', event, currentPoint)
      console.log('d, i', event.pageY - 10, currentPoint)
      self.selectedX = new Date(currentPoint.year).getFullYear()
      self.selectedY = currentPoint.population
      self.d3.select(this as any)
        .select('circle')
        .attr('r', 10)
      self.tooltip
        .style("left", event.pageX + "px")
        .style("top", (event.pageY + 20) + "px")
        .transition()
        .duration(200)
        .style("opacity", .9)
      console.log('self.d3.select(this).attr("cx")', self.d3.forceX())
    })
    this.pointsAndLabels.on('mouseout', function (d, i) {
      console.log('out====>d, i', d, i)
      self.d3.select(this as any).select('circle').attr('r', 5)
      self.tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    })
  }

  addLegends(): void {
    this.legends = this.graph
      .selectAll("legends")
      .append('g')
      .data(this.formattedData)
      .enter()
      .append('g')

    const commonY = 95;
    this.legends
      .append('rect')
      .attr("x", 100)
      .attr("y", (d, i) => {
        return commonY + (i * 50)
      })
      .attr("height", 10)
      .attr("width", 10)
      .attr("fill", (d, i) => this.colorScale(this.formattedData[i].name) as any)
    this.legends
      .append('text')
      .attr("x", 120)
      .attr("y", (d, i) => {
        return commonY + 10 + (i * 50)
      })
      .text((d) => `${d.name} population`)
      .attr("fill", (d, i) => this.colorScale(this.formattedData[i].name) as any)
      .style("font-size", "22px")
      .style("font-weight", "bolder")
  }
}
