import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import { deviceDataObject } from '../../models/device.class';
import { assetDataObject } from '../../models/asset.class';
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
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  data: any = null;
  tbToken :any = null;
  loading: boolean=false;
  tbUser: string;
  qParams;
  deviceData: deviceDataObject[];
  assetData: assetDataObject[];
  errorMessage;
  assetObject;
  assetId;

  constructor(
    private http: Http,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService    
  ) { }

  ngOnInit() {

}
}