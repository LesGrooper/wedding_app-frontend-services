import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  isSetValue = (param : any) : boolean => {
    if(typeof param !== undefined && param !== null){
      return true;
    }
    return false;
  }

  isEmpty = (param : any) : boolean => {
    if(!this.isSetValue(param)) return true;
    
    if(typeof param === "string") {
      return param == "";
    } else if (typeof param === "number") {
      return param === 0;
    } else if (typeof param === "object") {
      return Object.keys(param).length === 0;
    } else if (Array.isArray(param)) {
      return param.length === 0;
    }
    return false;
  }
}
