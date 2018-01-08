//relations class
  export class relationDataObject {
    constructor(
      public type: string,
      public typeGroup: string,
      public additionalInfo: null,
      public fromName: null,
      public toName: string,
      public from: aId,
      public to: dId){}
  };

  export class aId {
    constructor( 
      public entityType: string,
      public id: string){}
 };

 export class dId {
    constructor( 
      public entityType: string,
      public id: string){}
  };
