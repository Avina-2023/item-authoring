import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }

  setlocalValue(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getLocalValue(key: any) {
    return localStorage.getItem(key)
  }
}
