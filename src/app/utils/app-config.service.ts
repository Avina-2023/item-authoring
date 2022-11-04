import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {


  constructor(
    private route: Router
  ) { }

  // Navigations
  routeNavigation(path: any) {
    return this.route.navigate([path]);
  }


  setlocalValue(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getLocalValue(key: any) {
    return localStorage.getItem(key)
  }
}
