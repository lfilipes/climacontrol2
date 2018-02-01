import { Component, Injectable, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { _userName, _password, _tbBaseUrl, _customerId } from '../../core/env.config';
import { Title } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { assetDataObject } from '../../models/asset.class';
import { filterDataObject } from '../../models/filter.class';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
import { FilterPipe } from '../../core/filter-pipe'; 
// import { AuthService } from './../auth/auth.service';  --TBD
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
//import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  pageTitle = 'Clima Control';
  data: any = null;
  searchableList: string[] = null;
  tbToken :any = null;
  loading: boolean=false;
  tbUser: string
  assetData: assetDataObject[];
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
    private _dataService: DataService  
  ) {
    this.searchableList = ['name']
   }

  ngOnInit() {
  this.getAssets(); 
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