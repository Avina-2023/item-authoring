import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;

  constructor(
    private http: HttpClient,
    public toastr: ToastrService,
  ) { }


  register(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data)
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  uploaded(file: any):Observable<any> {
    return this.http.post(`${this.BASE_URL}/uploadQuestion`, file).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 400) {
        this.toastr.error('Bad Request: ' + error.error.message, 'Error',{
          closeButton:false
        });
      } else {
        this.toastr.error('An error occurred: ' + error.error.message, 'Error',{
          closeButton:false
        });
      }
      return throwError('Something went wrong; please try again later.');
    }));
  }

  Joblist(data: any) {
    return this.http.post(`${this.BASE_URL}/getBatchList`, data);
  }

  jobDetails(data: any) {
    return this.http.post(`${this.BASE_URL}/getBatchDetails`, data)
  }

  getOrganiz(data: any) {
    return this.http.post(`${this.BASE_URL}/getOrganization`, data)
  }

  toa(data: any) {
    return this.http.post(`${this.BASE_URL}/createXMLFolder`, data)
  }
  getInstanceData(data:any){
    return this.http.post(`${this.BASE_URL}/getInstanceList`,data)
  }


}
