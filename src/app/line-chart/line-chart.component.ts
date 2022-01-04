import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent extends BaseChartComponent {
  xScale: any;
  yScale: any;
  series: any;
  line: any;
  path: any;
  pointsAndLabels: any;

  constructor() {
    super()
  }

  beforeDrawChart(): void {
    this.formatData();
    this.defineScale();
    this.drawAxis()
  }

  defineScale(): void {
    const xValues = this.formattedData.map(d => d.year)
    console.log('xValues', xValues)
    // console.log('this.d3.min(xValues)', this.d3.min(xValues))
    // const minXDate = new Date(this.d3.min(xValues));
    // const minXMinusOne = this.d3.timeParse('%Y')(`${minXDate.getFullYear() - 1}`)
    const yValues = this.formattedData.map(d => d.population)
    this.xScale = this.d3.scaleTime()
      .range([this.margin.left, this.width])
      .domain([
        this.d3.min(xValues),
        this.d3.max(xValues)
      ])

    this.yScale = this.d3.scaleLinear().range([this.height, 0])
      .domain([
        this.d3.min(yValues) - 5,
        this.d3.max(yValues) + 5
      ])
  }

  getX(d: any) {
    console.log('d', d)
    return this.xScale(d.year);
  }

  getY(d: any) {
    console.log('d', d)
    return this.yScale(d.population);
  }

  defineLine(){
    this.line = this.d3.line()
      .x((d) => this.getX(d))
      .y((d) => this.getY(d))
      .curve(this.d3.curveMonotoneX);
  }

  drawChart(): void {
    this.defineLine();
    this.path = this.graph
      .append('path')
      .datum(this.formattedData)
      .attr("d", this.line)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')

    this.path.attr("stroke-dasharray", (d, i) => {
      console.log('d, i', d, i)
      return this.path.node().getTotalLength() + " " + this.path.node().getTotalLength();
    })
      .attr("stroke-dashoffset", this.path.node().getTotalLength())
      .transition()
      .duration(1000)
      .ease(this.d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }

  afterDrawChart(): void {
    this.drawPointsAndLabels();
    this.drawGridLines();
    this.addLegends();
  }

  drawAxis(): void {
    const { top, left, right, bottom } = this.margin;
    this.graph.append("g")
      .attr("class", "axis")
      .attr("transform", () => `translate(0,${this.height})`)
      .call(this.d3.axisBottom(this.xScale));
    this.graph.append("g")
      .attr("class", "axis")
      .attr("transform", () => `translate(${left},0)`)
      .call(this.d3.axisLeft(this.yScale));
  }

  drawPointsAndLabels() {
    this.pointsAndLabels = this.graph.selectAll("mypoints")
      .data(this.formattedData)
      .enter()
      .append("g")

    this.pointsAndLabels
      .append("circle")
      .attr("fill", "red")
      .attr("stroke", "none")
      .attr("cx", (d) => this.getX(d))
      .attr("cy", (d) => this.getY(d))
      .attr("r", 5)

    this.pointsAndLabels.append('text')
      .text(d => `${new Date(d.year).getFullYear()}, ${d.population}`)
      .style('fill', 'red')
      .style('display', 'none')
      .attr("x", (d) => this.getX(d))
      .attr("y", (d) => this.getY(d) - 10)

    const that = this;
    this.pointsAndLabels.on('mouseover', function (d, i) {
      console.log('d, i', d, i)
      that.d3.select(this as any)
        .select('circle')
        .attr('r', 10)
      that.d3.select(this as any)
        .select('text')
        .style('fill', 'blue')
        .style('font-size', '20px')
        .style('display', 'block')
    })
    this.pointsAndLabels.on('mouseout', function (d, i) {
      console.log('out====>d, i', d, i)
      that.d3.select(this as any).select('circle').attr('r', 5).attr('fill', 'red')
      that.d3.select(this as any).select('text').style('fill', 'red')
        .style('font-size', '16px')
        .style('display', 'none')
    })
  }

  formatData(): void {
    this.formattedData = this.data.map(d => {
      console.log('this.d3.timeParse("%Y")(`${d.year}`)', this.d3.timeParse("%Y")(`${d.year}`))
      return { ...d, year: this.d3.timeParse("%Y")(`${d.year}`) };
    })
  }

  drawGridLines() {
    const { left, bottom, top, right } = this.margin;
    this.graph.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${this.height})`)
      .call(this.d3.axisBottom(this.xScale).tickSize(-this.height).tickFormat('' as any))

    this.graph.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + left + ",0)")
      .call(this.d3.axisLeft(this.yScale).tickSize(-this.width).tickFormat('' as any))
  }

  addLegends() {
    this.legends = this.graph
      .append('g')
      .attr('class', 'legends')
    this.legends.append('circle')
      .attr('cx', 100)
      .attr('cy', 42)
      .attr('r', 5)
      .text('Yearwise population')
      .attr('fill', 'red')
    this.legends
      .append('text')
      .attr("x", 120)
      .attr("y", 50)
      .text(`Yearwise population`)
      .attr("fill", 'red')
      .style("font-size", "25px")
      .style("font-weight", "bolder")
  }
}
