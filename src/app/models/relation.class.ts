//relations class
  export class relationDataObject {
    public from: assetId[];
    public to: deviceId[];
    public type: string;
    public typeGroup: string;
    public additionalInfo: null;
    public fromName: null;
    public toName: string;
  }
  export class assetId {
   public entityType: string;
   public id: string;
 }
 export class deviceId {
    public entityType: string;
    public id: string;
  }