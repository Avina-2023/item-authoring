import { AppConfigService } from './../utils/app-config.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../utils/app-constants.service';


@Injectable({
  providedIn: 'root'
})
export class IsloggedInGuard implements CanActivate {
  constructor(private appConfig: AppConfigService) {

  }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.appConfig.getLocalValue('token')) {
      return true;
    } else {
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
      return false;
    }
  }

}
