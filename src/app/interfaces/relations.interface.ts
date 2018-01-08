//relations class
export interface relationsInterface {
     from: aId[];
     to: dId[];
     type: string;
     typeGroup: string;
     additionalInfo: null;
     fromName: null;
     toName: string;
  }

  export interface aId {
     entityType: string;
     id: string;
 }

 export interface dId {
     entityType: string;
     id: string;
  }
