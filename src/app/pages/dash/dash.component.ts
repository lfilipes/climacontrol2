import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { deviceDataObject } from '../../models/device.class';
import { assetDataObject } from '../../models/asset.class';
import { relationDataObject } from '../../models/relation.class';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
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

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  private relationData: relationDataObject[];
  private assetId;
  private loading;
  private errorMessage;
  private tbToken;

  constructor(
    private http: Http,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService, 
   
  
  ) { }

  ngOnInit() {
    this.assetId = this._dataService.assetId;
//    console.log('asset id is : ==========================>', this.assetId);
    this.loading=true;
    this.errorMessage="";
    let tbUser = JSON.parse(localStorage.getItem('currentUser'));
    this.tbToken = tbUser.token; 
    this.apiService.getAssetDevices(this.tbToken,this.assetId)
        .subscribe((data) => {
            this.relationData=data;
            console.log('relation data object is: ==========================>', this.relationData);
        },
        (error) => {this.errorMessage=error; this.loading=false; },
        () => {this.loading=false;})
    }
   
  buildDash(){


    
  }
}
