// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {_tbBaseUrl } from './env.config';
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthserviceService {
  public token: string;

  constructor(
    private http: Http,
    private router: Router
  ){
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;  
   }

   tbLogin(userName:string,password:string): Observable<boolean> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json'); 
    return this.http.post(_tbBaseUrl+'/api/auth/login', 
                            JSON.stringify({ username: userName, password: password }),
                            {headers: headers})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: userName, token: this.token }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
    }
  
    tbLogout() {
    localStorage.removeItem("currentUser");

  }

}