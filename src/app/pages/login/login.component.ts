import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service'; 
import { DataService } from '../../core/data-service.service'; 
import { AuthserviceService } from '../../core/authservice.service';
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  tbToken :any = null;
  loading: boolean=false;
  errorMessage:any = null;

  constructor(
    private http: Http,
    private apiService: ApiService,
    private authService: AuthserviceService,
    private router: Router,
    private _dataService: DataService  
  ) { }

  ngOnInit() {
     if(localStorage.getItem('currentUser')!== null) {
      this.authService.tbLogout();
     }
  } 

  login(){
    this.loading=true;
    this.authService.tbLogin(this.model.username, this.model.password)
    .subscribe(response => {     
      if (response === true) {   // login successful
        let tbUser = JSON.parse(localStorage.getItem('currentUser'));
        this.tbToken = tbUser.token; 
        console.log('the tbToken is : ===>', this.tbToken);
    } 
    },
      (error) => {this.errorMessage='error: user or password are incorrect'; this.loading=false; },
      () => {this.loading=false; 
            this.router.navigateByUrl('/assets');
          } 
    );
  }
}
