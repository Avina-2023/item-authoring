import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfigService } from '../utils/app-config.service';
import { ApiService } from '../../app/services/api.service'

@Injectable({
  providedIn: 'root'
})
export class IsAccessGuard implements CanActivate {
  constructor(
    private appSer: AppConfigService,
    private router: Router,
    public apiService: ApiService
  ) {

  }

  canActivate(): boolean {
    if (this.apiService.isLoggedIn()) {
      return false
    }
    else {
      this.router.navigate(['/home'])
      return true;
    }
  }
}

  // canAccess(): any {
  //   if (this.appSer.getLocalValue('key')) {
  //     return true
  //   }
  //   else {
  //     this.router.navigate(['/forgot'])
  //   }

  // }

