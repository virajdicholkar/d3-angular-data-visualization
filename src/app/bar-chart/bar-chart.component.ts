import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends LineChartComponent {

  selectedX = ''
  selectedY = ''
  bars: any;
  constructor() {
    super()
  }

  ngOnInit(): void {
    this.color = '#66c2a5'
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit()
    this.tooltip = this.d3.select(this.tooltipRef.nativeElement);
    console.log('this.tooltip', this.tooltip)
  }
  defineScale(): void {
    const xValues = this.formattedData.map(d => d.year)
    console.log('xValues', xValues)

    const yValues = this.data.map(d => d.population)

    this.xScale = this.d3.scaleBand()
      .range([this.margin.left, this.width])
      .domain(xValues)
      .padding(.4)

    this.yScale = this.d3.scaleLinear().range([this.height, 0])
      .domain([
        this.d3.min(yValues) - 5,
        this.d3.max(yValues) + 5
      ])
  }
  drawChart(): void {
    this.bars = this.graph.selectAll(".bar")
      .data(this.formattedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.xScale(d.year))
      .attr("y", (d) => this.yScale(this.height))
      .attr("width", this.xScale.bandwidth())
      .attr("height", (d) => this.height - this.yScale(d.population))
      .attr("fill", this.color)

    this.bars.on('mouseover', (event, currentPoint) => {
      console.log('d, i', event, currentPoint)
      console.log('d, i', event.pageY - 10, currentPoint)
      this.selectedX = `${new Date(currentPoint.year).getFullYear()}`
      this.selectedY = currentPoint.population
      this.tooltip
        .style("left", event.offsetX + "px")
        .style("top", (event.offsetY + 20) + "px")
        .transition()
        .duration(100)
        .style("opacity", .9)
    })

    this.bars.on('mousemove', (event, currentPoint) => {
      console.log('d, i', event, currentPoint)
      console.log('d, i', event.pageY - 10, currentPoint)
      this.selectedX = `${new Date(currentPoint.year).getFullYear()}`
      this.selectedY = currentPoint.population
      this.tooltip
        .style("left", event.offsetX + "px")
        .style("top", (event.offsetY + 20) + "px")
        .transition()
        // .duration(200)
        .style("opacity", .9)
    })

    this.bars.on('mouseout', (d, i) => {
      console.log('out====>d, i', d, i)
      this.tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    })
    this.animateChart()
  }

  drawAxis(): void {
    const { top, left, right, bottom } = this.margin;
    this.graph.append("g")
      .attr("class", "axis")
      .attr("transform", () => `translate(0,${this.height})`)
      .call(this.d3.axisBottom(this.xScale).tickFormat((d: any) => {
        return new Date(d).getFullYear() as any
      }));
    this.graph.append("g")
      .attr("class", "axis")
      .attr("transform", () => `translate(${left},0)`)
      .call(this.d3.axisLeft(this.yScale));
  }

  animateChart() {
    this.graph.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d) => this.getY(d))
      .attr("height", (d) => this.height - this.getY(d))
      .delay(function (d, i) { console.log(i); return (i * 100) })
  }
  drawPointsAndLabels(): void { }
}
