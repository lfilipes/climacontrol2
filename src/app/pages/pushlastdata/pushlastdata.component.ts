import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { deviceData, deviceDataObject } from '../../models/device.class';
import { assetDataObject } from '../../models/asset.class';
import { relationDataObject } from '../../models/relation.class';
import { tempLastRead,pwrLastRead  } from '../../models/timeSeries.class';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { mergeMap, flatMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-pushlastdata',
  templateUrl: './pushlastdata.component.html',
  styleUrls: ['./pushlastdata.component.scss']
})
export class PushlastdataComponent implements OnInit {
  private relationData : relationDataObject[];
  private deviceData: deviceDataObject[];
  private assetId;
  private loading;
  private tbToken;
  private errorMessage;
  private devices:deviceDataObject[] = [];
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
//                this._dataService.devicesFromAsset = this.devices; 
                this.storeLastPwrRead();
            })
  }    

  storeLastPwrRead(){
      var j = 0;
      var id =[] ;
      for (var i=0; i < this.devices.length; i++) {
          if(this.devices[i][0].type == 'pwr_sensor' ) {
              id[j] = this.devices[i][0].id.id
              const keys = "onoff,powerp1,powerp2,powerp3"
              this.apiService.getLastRead(this.tbToken,id[j],keys)
              .map(data => <pwrLastRead> data)
              .subscribe((data) => {
                  this.pwrDevLatest[j] = data;
                  j=j++;
                  console.log('=== passei ===');
              },
              (error) => {this.errorMessage=error;},
              () => {if(i == this.devices.length) {
                        this.storeLastTempRead();}
                    })
          }
      }
  }

  storeLastTempRead(){
      var j = 0;
      var id =[] ;
      for (var i=0; i < this.devices.length; i++) {
          if(this.devices[i][0].type == 'air_sensor' ) {
              id[j] = this.devices[i][0].id.id
              const keys = "temperature,humidity,presence"
              this.apiService.getLastRead(this.tbToken,id[j],keys)
              .map(data => <tempLastRead> data)
              .subscribe((data) => {
                  this.tempDevLatest[j] = data;
                  j=j++
              },
              (error) => {this.errorMessage=error; this.loading=false; },
              () => {if(i == this.devices.length) {
                  this.saveLatestData();}
              })
          }
      }
  }

  saveLatestData(){
      this._dataService.tempLastData = this.tempDevLatest; 
      this._dataService.pwrLastData = this.pwrDevLatest; 
      this.router.navigateByUrl('/lastdash'); 
  }
}
