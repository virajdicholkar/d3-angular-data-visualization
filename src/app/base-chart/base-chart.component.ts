import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import data from '../../assets/data.json';

export interface PopulationData {
  year: number;
  population: number;
  male_population: number;
}

@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})
export class BaseChartComponent implements OnInit, AfterViewInit {

  @ViewChild('svg') svgRef: ElementRef<SVGElement>;
  @ViewChild('tooltip') tooltipRef: ElementRef<HTMLDivElement>;
  d3 = d3;
  data = data;
  private svg: d3.Selection<SVGElement, unknown, null, undefined>;
  tooltip: any;
  width: number = 1000;
  height: number = 750;
  formattedData: any[];
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  }
  graph: d3.Selection<SVGGElement, unknown, null, undefined>;
  colorScale: d3.ScaleOrdinal<string, unknown, never>;
  legends: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setSVG()
    this.beforeDrawChart();
    this.drawChart();
    this.afterDrawChart();
  }

  setSVG() {
    const { top, left, right, bottom } = this.margin;
    this.svg = this.d3.select(this.svgRef.nativeElement)
      .attr("width", this.width + left + right)
      .attr("height", this.height + top + bottom);
    this.graph = this.svg
      .append('g')
      .attr("transfom", `translate(${left}, ${top})`)
  }

  setColorScale() {
    this.colorScale = this.d3.scaleOrdinal()
      .domain(data.map(d => `${d.year}`))
      .range(this.d3.schemeSet2);
  }
  beforeDrawChart(): void {
    this.defineScale()
  }
  drawChart(): void { }
  afterDrawChart(): void {
    this.addLegends();
  }
  formatData(): void { }
  defineScale(): void { }
  addLegends(): void { }
}
