import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import * as moment from 'moment';
import { DataService } from '../../core/data-service.service'; 

@Component({
//  moduleId: module.id,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  private chart: Array<any> = [];
  private temperatures : Array<any>;
  private humidities : Array<any>;
  private timeStamps : Array<any>;

  constructor(
    private _dataService: DataService, 
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.parseCharts();
    setTimeout(_=> this.loadChart1());
    setTimeout(_=> this.loadChart2());
 //   this.loadCharts();
  }

  // lineChart1 ==============================================================================
  public lineChart1Data:Array<any> = [
    {data: [], label: 'Temperature(o C)'}
  ];
  public lineChart1Labels:Array<any> = [];
  public lineChart1Options = {
    responsive: true,
    scales: {
        xAxes: [{
        type: 'time',
            time: {
                parser: 'X',
                displayFormats: {minute: 'HH:mm'},
                  // round: 'day'
                  tooltipFormat: 'll HH:mm'
                 },
            ticks: {
                stepSize: 1,
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
            }
        }]
    }
  };
  public lineChart1Colors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChart1Legend:boolean = true;
  public lineChart1Type:string = 'line';

  // lineChart2 ===============================================================================
  public lineChart2Data:Array<any> = [
    {data: [], label: 'Humidity( % )'}
  ];
  public lineChart2Labels:Array<any> = [];
  public lineChart2Options = {
    responsive: true,
    scales: {
        xAxes: [{
        type: 'time',
            time: {
                parser: 'X',
                displayFormats: {minute: 'HH:mm'},
                  // round: 'day'
                  tooltipFormat: 'll HH:mm'
                 },
            ticks: {
                stepSize: 1,
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
            }
        }]
    }
  };
  public lineChart2Colors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChart2Legend:boolean = true;
  public lineChart2Type:string = 'line';



// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  parseCharts() {
    this.charts.forEach((child) => {
        this.chart.push(child);
    });

  }


  loadChart1() {
     
    this.temperatures = this._dataService.temperatureArray;
    this.timeStamps = this._dataService.timeStampArray;

    this.lineChart1Data = [ // Update the chart data
        {data: this.temperatures, label: 'Temperature(o C)'}
    ];

 //   let range = n => Array.from(Array(n).keys()) // This is a function decleration. The function is exactly the same as Python's range(n) function. ECMAScript 6 feature used.
 //   this.lineChart1Labels = range(tempArr.length);
    this.lineChart1Labels = this.timeStamps;
    this.chart[0].chart.config.data.labels = this.lineChart1Labels; // This line is necessary because ng2-charts is not updating the chart's labels automatically
    }

    loadChart2() {
     
      this.humidities = this._dataService.humidityArray;
      console.log('humidity array: ====>', this.humidities);

      this.timeStamps = this._dataService.timeStampArray;
  
      this.lineChart2Data = [ // Update the chart data
          {data: this.humidities, label: 'Humidity ( % )'}
      ];
  
   //   let range = n => Array.from(Array(n).keys()) // This is a function decleration. The function is exactly the same as Python's range(n) function. ECMAScript 6 feature used.
   //   this.lineChart1Labels = range(tempArr.length);
      this.lineChart2Labels = this.timeStamps;
      this.chart[1].chart.config.data.labels = this.lineChart2Labels; // This line is necessary because ng2-charts is not updating the chart's labels automatically
      }
}
