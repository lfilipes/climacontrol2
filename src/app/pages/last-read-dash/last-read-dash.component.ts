import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-last-read-dash',
  templateUrl: './last-read-dash.component.html',
  styleUrls: ['./last-read-dash.component.scss']
})
export class LastReadDashComponent implements OnInit {
  private assetId;
  private loading;
  private tbToken;
  private errorMessage;
 

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
  }

  ngAfterViewInit() {
    setTimeout(_=> this.loadStatusGauge());
    setTimeout(_=> this.loadTempGauge());
    setTimeout(_=> this.loadA1Gauge());
    setTimeout(_=> this.loadA2Gauge());
    setTimeout(_=> this.loadA3Gauge());
    setTimeout(_=> this.loadA4Gauge());
  }

// StstusGauge
public statusGaugeSize = 160;
public statusGaugeType = "full";
public statusGaugeMin = "0";
public statusGaugeMax = "4";
public statusGaugeValue = "0";
public statusGaugeThick = "10";
public statusGaugeAppend = "";
public statusGaugeBackCol = "rgba(0, 0, 0, 0.1)";
public statusGaugeForeCol = "rgba(40, 182, 151, 1)";
//tempGauge
public tempGaugeSize = 160;
public tempGaugeType = "arch";
public tempGaugeMin = "0";
public tempGaugeMax = "40";
public tempGaugeValue = "0";
public tempGaugeThick = "10";
public tempGaugeAppend = " o C";
public tempGaugeForeCol = "rgba(40, 182, 151, 1)";
//pwrA1Gauge
public pwrA1GaugeSize = 160;
public pwrA1GaugeType = "arch";
public pwrA1GaugeMin = "0";
public pwrA1GaugeMax = "100";
public pwrA1GaugeValue = "0";
public pwrA1GaugeThick = "10";
public pwrA1GaugeAppend = " KwH";
public pwrA1GaugeForeCol = "rgba(40, 182, 151, 1)";
public pwrA1GaugeLabel = "";
//pwrA2Gauge
public pwrA2GaugeSize = 160;
public pwrA2GaugeType = "arch";
public pwrA2GaugeMin = "0";
public pwrA2GaugeMax = "100";
public pwrA2GaugeValue = "0";
public pwrA2GaugeThick = "10";
public pwrA2GaugeAppend = " KwH";
public pwrA2GaugeForeCol = "rgba(40, 182, 151, 1)";
public pwrA2GaugeLabel = "";
//pwrA3Gauge
public pwrA3GaugeSize = 160;
public pwrA3GaugeType = "arch";
public pwrA3GaugeMin = "0";
public pwrA3GaugeMax = "100";
public pwrA3GaugeValue = "0";
public pwrA3GaugeThick = "10";
public pwrA3GaugeAppend = " KwH";
public pwrA3GaugeForeCol = "rgba(40, 182, 151, 1)";
public pwrA3GaugeLabel = "";
//pwrA4Gauge
public pwrA4GaugeSize = 160;
public pwrA4GaugeType = "arch";
public pwrA4GaugeMin = "0";
public pwrA4GaugeMax = "100";
public pwrA4GaugeValue = "0";
public pwrA4GaugeThick = "10";
public pwrA4GaugeAppend = " KwH";
public pwrA4GaugeForeCol = "rgba(40, 182, 151, 1)";
public pwrA4GaugeLabel = "";

public numAr = this._dataService.pwrLastData.length;

  loadStatusGauge(){
    this.statusGaugeValue = this.numAr.toString()

    var notPowered = this._dataService.pwrLastData[0].onoff[0].value

    if ( notPowered == "true") {
      this.statusGaugeAppend = " OFF";
      this.statusGaugeForeCol = "rgba(240, 13, 51, 1)";
    }else{
      this.statusGaugeAppend = " ON";
    } 
  }

  loadTempGauge(){
    this.tempGaugeValue = this._dataService.tempLastData[0].temperature[0].value.toString()

  }
  
  loadA1Gauge(){
    var pwr = this._dataService.pwrLastData[0].powerp1[0].value + this._dataService.pwrLastData[0].powerp2[0].value + this._dataService.pwrLastData[0].powerp3[0].value
    this.pwrA1GaugeValue = pwr.toString();
    if (pwr == 0){
      this.pwrA1GaugeLabel = "Ar OFF"
    }
  }

  loadA2Gauge(){
    if (this.numAr > 1){
    var  pwr = this._dataService.pwrLastData[1].powerp1[0].value + this._dataService.pwrLastData[1].powerp2[0].value + this._dataService.pwrLastData[1].powerp3[0].value
      this.pwrA2GaugeValue = pwr.toString();
    }else{
        this.pwrA2GaugeLabel = "Ar Inexistente"
    }
    if (pwr == 0){
      this.pwrA2GaugeLabel = "Ar OFF"
    }
  }

  loadA3Gauge(){
    if (this.numAr > 2){
      var pwr = this._dataService.pwrLastData[2].powerp1[0].value + this._dataService.pwrLastData[2].powerp2[0].value + this._dataService.pwrLastData[2].powerp3[0].value
      this.pwrA3GaugeValue = pwr.toString;
    }else{
        this.pwrA3GaugeLabel = "Ar Inexistente"
      }
      if (pwr == 0){
        this.pwrA3GaugeLabel = "Ar OFF"
      }
    }
  
  loadA4Gauge(){
    if (this.numAr > 3){
      var pwr = this._dataService.pwrLastData[3].powerp1[0].value + this._dataService.pwrLastData[3].powerp2[0].value + this._dataService.pwrLastData[3].powerp3[0].value
      this.pwrA4GaugeValue = pwr.toString;
    }else{
        this.pwrA4GaugeLabel = "Ar Inexistente"
      }
      if (pwr == 0){
        this.pwrA4GaugeLabel = "Ar OFF"
      }
    }



  }

