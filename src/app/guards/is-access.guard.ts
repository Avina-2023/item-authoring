import { ApiService } from './../services/api.service';
import { AppConfigService } from './../utils/app-config.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import * as CryptoJS from 'crypto-js';
import { APP_CONSTANTS } from '../utils/app-constants.service';
@Injectable({
  providedIn: 'root'
})
export class IsAccessGuard implements CanLoad {
  constructor(private appConfig: AppConfigService, private apiService: ApiService) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.appConfig.getLocalValue('token')) {
      return true;
    } else {
      // this.apiService.logout();
      localStorage.clear();
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN)
      return false;
    }
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     let param = route.queryParams;
  //     if(param){
  //     //  let details =  this.apiService.decrypt(param.details);
  //         // if( details.email && (details.type  == 'microcert' || details.type  == 'campus')){
  //         //      localStorage.setItem('type',details.type);
  //         //      localStorage.setItem('token', 'true');
  //         //      sessionStorage.setItem('email',details.email)
  //         //      sessionStorage.setItem('driveInfo', details.driveId);
  //         //      sessionStorage.setItem('assessmentId',details.assessmentId); 
  //         //     //  this.appConfig.setLocalStorage('role',JSON.stringify(details.role));
  //         //       return true
  //         // }else {
  //         //   // this.apiService.logout();
  //           this.appConfig.routeNavigation('/error')
  //         //   return false
  //         // }
  //     }else{
  //       if (this.appConfig.getLocalValue('token')) {
  //         return true;
  //       } else {
  //         localStorage.clear();
  //         this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN)
  //         return false;
  //       }  
  //     }

  // }

}
