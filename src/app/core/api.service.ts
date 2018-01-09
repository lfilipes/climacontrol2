// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { _userName, _password, _tbBaseUrl, _customerId } from './env.config';
import { assetDataObject } from '../models/asset.class';
import { deviceDataObject } from '../models/device.class';
import { relationDataObject } from '../models/relation.class';
import { temperatureTS,humidityTS,presenceTS,onoffTS,powerTS } from '../models/timeSeries.class';
// import { AuthService } from './../auth/auth.service';  --TBD
import {HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
//import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class ApiService {
  public token: string;
          

  constructor(
    private http: Http,
    
//    private auth: AuthService   --TBD
  ) {
      // set token if saved in local storage
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.token = currentUser && currentUser.token;  
    
   }

  // add your methods here 

    tbLogin(): Observable<boolean> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json'); 
    return this.http.post(_tbBaseUrl+'/api/auth/login', 
                            JSON.stringify({ username: _userName, password: _password }),
                            {headers: headers})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: _userName, token: token }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
    }

    getAssets(tbToken:string): Observable<assetDataObject[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
        return this.http.get(_tbBaseUrl+'/api/customer/'+_customerId+'/assets?limit=100',
            {headers: headers})
                .map(this.extractData)
                .catch(this.handleError)
    } 

    getAssetDevices(tbToken:string,_assetId:string): Observable<relationDataObject[]> {
        const _relationUrl = _tbBaseUrl+'/api/relations/info?fromId='+_assetId+'&fromType=ASSET';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
        return this.http.get(_relationUrl,{headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }  

////////////////   promisses alternative to get devices from asset 
getDevFrAssetP(tbToken:string,_assetId:string): Promise<relationDataObject[]>
{
    const _relationUrl = _tbBaseUrl+'/api/relations/info?fromId='+_assetId+'&fromType=ASSET';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
      return this.http.get(_relationUrl,{headers: headers})
      .toPromise()
      .then(this.extractDataP)
      .catch(this.handleError);   
}

private extractDataP(res: Response) {
    let body = res.json();
    return body || [];
}

    getDevice(tbToken:string,_deviceId:string): Observable<deviceDataObject> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
//        http://192.168.1.104:8080/api/devices?deviceIds=efdb1870-d06f-11e7-9c2a-5997ca966e82
        return this.http.get(_tbBaseUrl+'/api/devices?deviceIds='+_deviceId,
            {headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }  

    getTimeSeriesT(tbToken:string,_deviceId:string,_value:string,tStart:string,tEnd:string,interval:string):Observable<temperatureTS>   {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
//        http://192.168.1.104:8080/api/plugins/telemetry/DEVICE/3f82ad60-d071-11e7-9c2a-5997ca966e82/values/timeseries?keys=humidity,ilum,temperature&startTs=151241731200&endTs=1512417432789&interval=120000&limit=100&agg=NONE
        return this.http.get(_tbBaseUrl+'/api/plugins/telemetry/DEVICE/'+_deviceId+'/values/timeseries?keys='+_value+'&startTs='+tStart+'&endTs='+tEnd+'&interval='+interval+'&limit=1000&agg=AVG',
            {headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }  
    getTimeSeriesH(tbToken:string,_deviceId:string,_value:string,tStart:string,tEnd:string,interval:string):Observable<humidityTS>   {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
//        http://192.168.1.104:8080/api/plugins/telemetry/DEVICE/3f82ad60-d071-11e7-9c2a-5997ca966e82/values/timeseries?keys=humidity,ilum,temperature&startTs=151241731200&endTs=1512417432789&interval=120000&limit=100&agg=NONE
        return this.http.get(_tbBaseUrl+'/api/plugins/telemetry/DEVICE/'+_deviceId+'/values/timeseries?keys='+_value+'&startTs='+tStart+'&endTs='+tEnd+'&interval='+interval+'&limit=1000&agg=AVG',
            {headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }

    getTimeSeriesP(tbToken:string,_deviceId:string,_value:string,tStart:string,tEnd:string,interval:string):Observable<presenceTS>   {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
//        http://192.168.1.104:8080/api/plugins/telemetry/DEVICE/3f82ad60-d071-11e7-9c2a-5997ca966e82/values/timeseries?keys=humidity,ilum,temperature&startTs=151241731200&endTs=1512417432789&interval=120000&limit=100&agg=NONE
        return this.http.get(_tbBaseUrl+'/api/plugins/telemetry/DEVICE/'+_deviceId+'/values/timeseries?keys='+_value+'&startTs='+tStart+'&endTs='+tEnd+'&interval='+interval+'&limit=1000&agg=AVG',
            {headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }

    getTimeSeriesPwr(tbToken:string,_deviceId:string,_value:string,tStart:string,tEnd:string,interval:string):Observable<powerTS>   {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
//        http://192.168.1.104:8080/api/plugins/telemetry/DEVICE/3f82ad60-d071-11e7-9c2a-5997ca966e82/values/timeseries?keys=humidity,ilum,temperature&startTs=151241731200&endTs=1512417432789&interval=120000&limit=100&agg=NONE
        return this.http.get(_tbBaseUrl+'/api/plugins/telemetry/DEVICE/'+_deviceId+'/values/timeseries?keys='+_value+'&startTs='+tStart+'&endTs='+tEnd+'&interval='+interval+'&limit=1000&agg=AVG',
            {headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }

    getTimeSeriesO(tbToken:string,_deviceId:string,_value:string,tStart:string,tEnd:string,interval:string):Observable<onoffTS>   {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Authorization' ,  `Bearer ${tbToken}`); 
//        http://192.168.1.104:8080/api/plugins/telemetry/DEVICE/3f82ad60-d071-11e7-9c2a-5997ca966e82/values/timeseries?keys=humidity,ilum,temperature&startTs=151241731200&endTs=1512417432789&interval=120000&limit=100&agg=NONE
        return this.http.get(_tbBaseUrl+'/api/plugins/telemetry/DEVICE/'+_deviceId+'/values/timeseries?keys='+_value+'&startTs='+tStart+'&endTs='+tEnd+'&interval='+interval+'&limit=1000&agg=AVG',
            {headers: headers})
                .map(res => res.json())
                .catch(this.handleError)
    }

    logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    }

    private extractData(res: Response) {
    let body = res.json();
    return body.data || [];

    } 

    private handleError(error:Response|any){

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }  

}