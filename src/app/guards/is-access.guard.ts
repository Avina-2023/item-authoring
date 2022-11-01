import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfigService } from '../utils/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class IsAccessGuard implements CanActivate {
  constructor(
    private appSer: AppConfigService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canAccess(): any {
    if (this.appSer.getLocalValue('key')) {
      return true
    }
    else {
      this.router.navigate([''])
    }

  }
}
