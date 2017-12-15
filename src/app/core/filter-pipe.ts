import { Pipe, PipeTransform } from '@angular/core';

//@Pipe({
//    name: 'FilterPipe'
//  })
//  export class FilterPipe implements PipeTransform {
//   
//    transform(items: any[], value: string, searchableList:any): any[] {
//      if (!items) return [];
//      if (!value) return  items;
//      if (value == '' || value == null) return [];
//      return items.filter(e => e[searchableList].toLowerCase().indexOf(value) > -1 );
//      
//    }
//   
//  }

  
  @Pipe({
      name: 'FilterPipe',
  })
  export class FilterPipe implements PipeTransform {
   transform(value: any, input: string,searchableList : any) {
    if (input) {
     input = input.toLowerCase();
     return value.filter(function (el: any) {
     var isTrue = false;
     for(var k in searchableList ){
       if(el[searchableList[k]].toLowerCase().indexOf(input) > -1){
        isTrue = true;
       }
       if(isTrue){
        return el
       }
      }
    })
   }
   return value;
   }
  }