import { Injectable } from '@angular/core';
import { assetDataObject } from '../models/asset.class';

@Injectable()
export class DataService {
  public assetId:string;
  public devicesFromAsset:Array<any>;

  public tempLastData:Array<any>;
  public pwrLastData:Array<any>;
  
  public timeStampArray:Array<any>;
  public temperatureArray:Array<any>;
  public powerp1Array:Array<any>;
  public powerp2Array:Array<any>;
  public powerp3Array:Array<any>;
  public onoffArray:Array<any>;

  constructor() {
   }

}
