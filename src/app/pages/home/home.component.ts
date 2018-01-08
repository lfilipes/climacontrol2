import { Component, Injectable, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { _userName, _password, _tbBaseUrl, _customerId } from '../../core/env.config';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { assetDataObject } from '../../models/asset.class';
import { filterDataObject } from '../../models/filter.class';
import { deviceDataObject, deviceData } from '../../models/device.class';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
import { FilterPipe } from '../../core/filter-pipe'; 
// import { AuthService } from './../auth/auth.service';  --TBD
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
//import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/min';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Clima Control';
  data: any = null;
  searchableList: string[] = null;
  tbToken :any = null;
  loading: boolean=false;
  tbUser: string
  assetData: assetDataObject[];
  deviceData: deviceDataObject[];
  errorMessage;
  assetId;
  numberOfDevices: number;
  limit: number;
  page: number = 1;
  filter: filterDataObject; 
  
  constructor(
    private title: Title,
    private http: Http,
    private apiService: ApiService,
    private router: Router,
    private _dataService: DataService  
  ) {
    this.searchableList = ['name']
   }

  ngOnInit() {
    this.loading=true;
    if (JSON.parse(localStorage.getItem('currentUser')) !== _customerId) {    
    this.apiService.tbLogin()
    .subscribe(response => {     
      if (response === true) {   // login successful
        let tbUser = JSON.parse(localStorage.getItem('currentUser'));
        this.tbToken = tbUser.token; 
        console.log('the tbToken is : ===>', this.tbToken);
    } 
    },
      (error) => {this.errorMessage=error; this.loading=false; },
      () => {this.loading=false; this.getAssets();  } 
    );
      }else{
        this.getAssets(); 
      }     
  }

login() {
  this.loading=true;
  this.apiService.tbLogin()
  .subscribe(response => {     
    if (response === true) {   // login successful
      let tbUser = JSON.parse(localStorage.getItem('currentUser'));
      this.tbToken = tbUser.token; 
      console.log('the tbToken is : ==========================>', this.tbToken);
  } 
  },
    (error) => {this.errorMessage=error; this.loading=false; },
    () => {this.loading=false;} );
  }

  getAssets() {
    this.loading=true;
    this.errorMessage="";
    let tbUser = JSON.parse(localStorage.getItem('currentUser'));
    this.tbToken = tbUser.token; 
    this.apiService.getAssets(this.tbToken)
        .subscribe((data) => {
            this.assetData=data;
        },
        (error) => {this.errorMessage=error; this.loading=false; },
        () => {this.loading=false;})
  }

  storeAssetId(id) {
    this._dataService.assetId = id; 
  }
 
}

  
