//device class
export class deviceData {
    public data : deviceDataObject[];
    public nextPageLink : null;
    public hasNext : boolean;
  }
  export class deviceDataObject {
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
   public gateway: boolean;
 }