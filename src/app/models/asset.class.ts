//asset class
  export class assetData {
    public data : assetDataObject[];
    public nextPageLink : null;
    public hasNext : boolean;
  }
  export class assetDataObject {
    public createdTime: string;
    public name: string;
    public type: string
    public id: idObject[];
    public tenantId: tenantIdObject[];
    public customerId: customerIdObject[];
    public additionalInfo: additionalInfoObject[];
  }
  export class idObject {
   public entityType: string;
   public id: string;
 }
 export class tenantIdObject {
   public entityType: string;
   public id: string;
 }
 export class customerIdObject {
   public entityType: string;
   public id: string;
 }
 export class additionalInfoObject {
   public description: string;
 }