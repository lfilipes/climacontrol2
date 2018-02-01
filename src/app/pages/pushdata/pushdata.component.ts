import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { deviceData, deviceDataObject } from '../../models/device.class';
import { assetDataObject } from '../../models/asset.class';
import { relationDataObject } from '../../models/relation.class';
import { temperatureTS,humidityTS,presenceTS,onoffTS,powerp1TS,powerp2TS,powerp3TS,tempLastRead,pwrLastRead  } from '../../models/timeSeries.class';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { mergeMap, flatMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-pushdata',
  templateUrl: './pushdata.component.html',
  styleUrls: ['./pushdata.component.scss']
})
export class PushdataComponent implements OnInit {
  private relationData : relationDataObject[];
  private onerelationData : relationDataObject;
  private deviceData: deviceDataObject[];
  private oneDeviceData: deviceDataObject;
  private temperatureDim : temperatureTS;
  private humidityDim : humidityTS;
  private presenceDim : presenceTS;
  private anyTimeSeriesDim : any;
  private power1Dim = [];
  private power2Dim = [];
  private power3Dim = [];
  private onoffDim = [];

  private items:any[];
  private assetId;
  private loading;
  private tbToken;
  private relations:relationDataObject[] = [];
  private devices:deviceDataObject[] = [];
  private errorMessage;
  private tempDevLatest: tempLastRead[] = [];
  private pwrDevLatest: pwrLastRead[] = [];

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

  public tEnd = (new Date('2018-01-31 20:00:00')).getTime().toString(); 
  public tStart = (new Date('2018-01-30 20:00:00')).getTime().toString(); // 1 dia
  public interval = '900000';   // Agregation interval de 15 minutos: Um total de 24 x 4 horas = 96 pontos

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
//                  this._dataService.devicesFromAsset = this.devices; 
                  this.storePwr();
                }
          )
  }    


storePwr(){
  var j = 0;
  var id =[] ;
  for (var i=0; i < this.devices.length; i++) {
    if(this.devices[i][0].type == 'pwr_sensor' ) {
        id[j] = this.devices[i][0].id.id
        Observable.forkJoin(
          this.apiService.getTimeSeriesPwr(this.tbToken,id[j],'powerp1',this.tStart,this.tEnd,this.interval),
          this.apiService.getTimeSeriesPwr(this.tbToken,id[j],'powerp2',this.tStart,this.tEnd,this.interval),
          this.apiService.getTimeSeriesPwr(this.tbToken,id[j],'powerp3',this.tStart,this.tEnd,this.interval),
          this.apiService.getTimeSeriesO(this.tbToken,id[j],'onoff',this.tStart,this.tEnd,this.interval))
          .subscribe((data) => {
              console.log('power1Dim[0]: ====>', data[0]);
              this.power1Dim[j] = data[0];
              this.power2Dim[j] = data[1];
              this.power3Dim[j] = data[2];
              this.onoffDim[j] = data[3];
              console.log('onoffDim ====>', this.onoffDim);
              j=j++;
          },
          (error) => {this.errorMessage=error; this.loading=false; },
          () => {if(i == this.devices.length) {
                  this.storeTemp();}
                }
          )
    }
  }
}

storeTemp(){
  var j = 0;
  var id =[] ;
  for (var i=0; i < this.devices.length; i++) {
    if(this.devices[i][0].type == 'air_sensor' ) {
        id[j] = this.devices[i][0].id.id
        Observable.forkJoin(
          this.apiService.getTimeSeriesT(this.tbToken,id[j],'temperature',this.tStart,this.tEnd,this.interval),
          this.apiService.getTimeSeriesH(this.tbToken,id[j],'humidity',this.tStart,this.tEnd,this.interval),
          this.apiService.getTimeSeriesP(this.tbToken,id[j],'presence',this.tStart,this.tEnd,this.interval))
          .subscribe((data) => {
            this.temperatureDim = data[0];
            this.humidityDim = data[1];
            this.presenceDim = data[2]; 
              j=j++;
          },
          (error) => {this.errorMessage=error; this.loading=false; },
          () => {if(i == this.devices.length) {
                  this.saveTimeSeries();}
                }
          )
    }
  }
}

  saveTimeSeries() {
    var timeStamps = [];
    var temperature = [];

    var powerp1 = [];
    var powerp2  = [];
    var powerp3  = [];
    var onoff  = [];

    for (var i=0; i < this.power1Dim.length; i++) {
      powerp1[i]=[];
      powerp2[i]=[];
      powerp3[i]=[];
      onoff[i]=[];
      for (var j=0; j < this.power1Dim[i].powerp1.length; j++){
        powerp1[i][j]=[];
        powerp2[i][j]=[];
        powerp1[i][j]=[];
        onoff[i][j]=[];
      } 
    }

    for (var j=0; j < this.temperatureDim.temperature.length; j++){
      timeStamps[j] = parseInt(this.temperatureDim.temperature[j].ts);
      temperature[j] = parseFloat(this.temperatureDim.temperature[j].value).toFixed(1);
    }
    console.log('power1Dim length: ====>', this.power1Dim.length);
    console.log('power1Dim : ====>', this.power1Dim);
    
    console.log('power1Dim[0].powerp1[0].value: ====>', parseInt(this.power1Dim[0].powerp1[0].value));
//    console.log('onoffDim[0].onoff[0].value: ====>', this.onoffDim[0].onoff[0].value);

    for (var i=0; i < this.power1Dim.length; i++) {
      for (var j=0; j < this.power1Dim[i].powerp1.length; j++){
        powerp1[i][j] = parseFloat(this.power1Dim[i].powerp1[j].value).toFixed(1);
        powerp2[i][j] = parseFloat(this.power2Dim[i].powerp2[j].value).toFixed(1);
        powerp3[i][j] = parseFloat(this.power3Dim[i].powerp3[j].value).toFixed(1);
//        onoff[i][j] = this.onoffDim[i].onoff[j].value;
      }
    }
    this._dataService.timeStampArray = timeStamps; 
    this._dataService.temperatureArray = temperature; 
    this._dataService.powerp1Array = powerp1;
    this._dataService.powerp2Array = powerp2;
    this._dataService.powerp3Array = powerp3;
//    this._dataService.onoffArray = onoff;
    console.log('timestamps: ====>', this._dataService.timeStampArray);
    console.log('temperature: ====>', this._dataService.temperatureArray);
    console.log('powerp1Array: ====>',  this._dataService.powerp1Array);
    console.log('powerp2Array: ====>',  this._dataService.powerp2Array);
    console.log('powerp3Array: ====>',  this._dataService.powerp3Array);
//    console.log('onoffArrayy: ====>',  this._dataService.onoffArray);

     this.router.navigateByUrl('/charts'); 
  }

}