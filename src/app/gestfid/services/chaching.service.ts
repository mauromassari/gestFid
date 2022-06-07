import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChachingService {

  cache = new Map();
  expiry: number = 180; // secondi di validità della cache

  constructor() { }

  getCache(url: string){

    let result = this.cache.get(url);

    if(result){
      let response = result.response;
      let cacheDate = new Date(result.date).getTime();
      let currentDate = new Date().getTime();
      let diffSeconds = (currentDate - cacheDate) / 1000;

      return (diffSeconds) > this.expiry ? this.deleteCache(url) : response;
    }
    else { return null};
  }

  setCache(url: string, response: any, date: any){
    this.cache.set(url, {response: response, date: date});
  }

  deleteCache(url: string){
    this.cache.delete(url);
    return null;
  }

  clearAll(){
    this.cache.clear();
    return null;
  }
}
