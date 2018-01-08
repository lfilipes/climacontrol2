import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { deviceData, deviceDataObject } from '../../models/device.class';
import { assetDataObject } from '../../models/asset.class';
import { relationDataObject } from '../../models/relation.class';
import { temperatureTS,humidityTS,presenceTS,onoffTS,powerTS } from '../../models/timeSeries.class';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
// import { AuthService } from './../auth/auth.service';  --TBD
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { Observable} from 'rxjs/Rx';
import { mergeMap, flatMap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})

export class DashComponent implements OnInit {
  private relationData : relationDataObject[];
  private onerelationData : relationDataObject;
  private deviceData: deviceDataObject[];
  private oneDeviceData: deviceDataObject;
  private temperatureDim : temperatureTS;
  private humidityDim : humidityTS;
  private presenceDim : presenceTS;
  private anyTimeSeriesDim : any;
  private onoff : onoffTS;
  private onoffDim = new Array(this.onoffDim);
  private power : powerTS;
  private powerDim = new Array(this.powerDim);
  private tStart : Date;
  private tEnd : Date;
  private items:any[];
  private assetId;
  private loading;
  private tbToken;
  private relations:relationDataObject[] = [];
  private devices:deviceDataObject[] = [];
  private errorMessage;

// lineChart
  //public lineChartLabels : Array<any> = [1493199182012,1493199364487,1493201144363];
  //public lineChartData : Array<any> = [{data: ["26", "27", "29"], label:"temperature"}];
  public lineChartData :Array<any> = [{data:[], label: ''}];
  public lineChartLabels: Array<any> = [];
  public lineChartColors : Array<any> = [];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  public lineChartOptions :any = {};
// end chart test

  constructor(
    private http: Http,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService, 
 
  ) { }

  ngOnInit() {
    this.assetId = this._dataService.assetId;
    let tbUser = JSON.parse(localStorage.getItem('currentUser'));
    this.tbToken = tbUser.token; 
    this.getWithFlatMapForkJoin();
    }
      
  getWithFlatMapForkJoin(){
        this.apiService.getAssetDevices(this.tbToken,this.assetId)
        .flatMap(
            data => {
                this.relationData = data;
                console.log(' relationData Object: ===>', this.relationData)
                var observables = [];
                for(let x of data){
                    var id = x.to.id;
                    observables.push(this.apiService.getDevice(this.tbToken,id));
                }
                return Observable.forkJoin(observables);
              })
              .map(data => <deviceDataObject[]> data)
              .subscribe((data) => {
                this.devices = data;  
            },
            (error) => {this.errorMessage=error; this.loading=false; },
            () => {this.loading=false; 
                    console.log(' devices Object: ===>', this.devices[0][0].type);
                    console.log(' devices Object: ===>', this.devices[1][0].type);
                    this.storeTimeSeries();
                })
    }    

    storeTimeSeries(){
        console.log('devices length: ===>',  this.devices.length);
        const _tEnd = (new Date('2018-1-2 20:00:00')).getTime().toString(); 
        const _tStart = (new Date('2017-12-26 20:00:00')).getTime().toString(); // 7 dias
        const _interval = '3600000';   // Agregation interval de 1 hora
        // um total de 24 x 7 horas = 168 pontos
        let i : number = 0;
        for (var j=0; j < this.devices.length; j++) {
            if(this.devices[j][0].type == 'pwr_sensor' ) {
                const id = this.devices[j][0].id.id
                Observable.forkJoin(
                this.apiService.getTimeSeriesPwr(this.tbToken,id,'powerp1',_tStart,_tEnd,_interval),
                this.apiService.getTimeSeriesO(this.tbToken,id,'onoff',_tStart,_tEnd,_interval))
                .subscribe((data) => {
                    this.powerDim[i] = data[0];
                    this.onoffDim[i] = data[1];
                },
                (error) => {this.errorMessage=error; this.loading=false; },
                () => {this.loading=false;
                    console.log('power time series dim is: ====>', this.powerDim[0]);
                    console.log('onoffDim time series dim is: ====>', this.onoffDim[0]);
                    i=i++;
                    if (j === this.devices.length){
                      this.drawCharts();
                    }
                })

            } else if(this.devices[j][0].type == 'air_sensor' ) {
                const id = this.devices[j][0].id.id
                Observable.forkJoin(
                this.apiService.getTimeSeriesT(this.tbToken,id,'temperature',_tStart,_tEnd,_interval),
                this.apiService.getTimeSeriesH(this.tbToken,id,'humidity',_tStart,_tEnd,_interval),
                this.apiService.getTimeSeriesP(this.tbToken,id,'presence',_tStart,_tEnd,_interval))
                .subscribe((data) => {
                    this.temperatureDim = data[0];
                    this.humidityDim = data[1];
                    this.presenceDim = data[2];   
                },
                (error) => {this.errorMessage=error; this.loading=false; },
                () => {this.loading=false;
                    console.log('temperature time series dim is: ====>', this.temperatureDim.temperature[0].ts);                 
                    console.log('humidity time series dim is: ====>', this.humidityDim);
                    console.log('presence time series dim is: ====>', this.presenceDim);
                    if (j === this.devices.length){
                      this.drawCharts();
                    }
                })


            }   
        }
    }


    
  // chart test continued
  drawCharts() {
  
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.lineChartOptions = {
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
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    let timeStamps : Array<any> = [];
    let temperatures = [];
    
    for (var j=0; j <168; j++){
      timeStamps[j] = parseInt(this.temperatureDim.temperature[j].ts);
      temperatures[j] = parseFloat(this.temperatureDim.temperature[j].value).toFixed(1); 
    }
    
    let _chartData = [{ data:[],label:'Temperature'}];
    _chartData[0].data = temperatures;
    this.lineChartData = _chartData;
    this.lineChartLabels = timeStamps;
    
    console.log('timeStamps: ====>', this.lineChartData);
    console.log('temperatures: ====>', this.lineChartLabels);
  }
  
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
  
    public chartHovered(e:any):void {
      console.log(e);
    }
  // end chart test continued

  }

