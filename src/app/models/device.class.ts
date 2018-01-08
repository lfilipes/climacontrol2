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
    public id: idObject;
    public tenantId: tenantIdObject;
    public customerId: customerIdObject;
    public additionalInfo: additionalInfoObject;

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

 export interface deviceInt { 
  createdTime: string;
  name: string;
  type: string
  id: idObject;
  tenantId: tenantIdObject;
  customerId: customerIdObject;
  additionalInfo: additionalInfoObject;base_url: string;
}

export interface idObject {
entityType: string;
id: string;
}
export interface tenantIdObject {
entityType: string;
id: string;
}
export interface customerIdObject {
entityType: string;
id: string;
}
export interface additionalInfoObject {
description: string;
gateway: boolean;
}