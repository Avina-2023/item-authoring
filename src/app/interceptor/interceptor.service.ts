import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { AppConfigService } from '../utils/app-config.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    public appConfig: AppConfigService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = request.clone({
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })

    });
    if (request.reportProgress) {
    }
    return next.handle(clone).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
        return event;
      }),
      retry(3),

      catchError((error: HttpErrorResponse) => {

        if (error && error['status'] !== 200) {
        }

        if (error.status === 0) {
          this.toastr.error('Your network connection is down or Request is getting timed out.', 'Please try again later..',{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 400) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '400 Bad Request',"",{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 401) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '401 Unauthorized',"",{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 403) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '403 Forbidden',"",{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 422) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '422 Unprocessable entity',"",{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 500) {
          this.toastr.error('Server Error', 'Please try again later',{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 404) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '404 No data found',"",{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 409) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '409 Conflict error',"",{
            closeButton:false
          });
          return throwError(error);
        }

        if (error.status === 200) {
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}

