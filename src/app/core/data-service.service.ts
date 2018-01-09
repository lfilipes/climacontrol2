import { Injectable } from '@angular/core';
import { assetDataObject } from '../models/asset.class';

@Injectable()
export class DataService {
  public assetId:string;
  public timeStampArray:Array<any>;
  public temperatureArray:Array<any>;
  public humidityArray:Array<any>;
  constructor() {
   }

}
