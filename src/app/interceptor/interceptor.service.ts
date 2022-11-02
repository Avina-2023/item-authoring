import { Injectable } from '@angular/core';
import { ApiService } from '../../app/services/api.service'
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  private _injector: any;

  constructor() { }
  intercept(req: { clone: (arg0: { setHeaders: { authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
    let authService = this._injector.get(ApiService)
    let tokenizedRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${authService.gettoken()}`
      }
    })
    return next.handle(tokenizedRequest)
  }

}
