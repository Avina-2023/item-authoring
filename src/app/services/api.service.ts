import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;
  TAO_URL = environment.API_TAO_URL

  constructor(
    private http: HttpClient,
  ) { }


  register(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data)
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  uploaded(file: any) {
    return this.http.post(`${this.BASE_URL}/uploadQuestion`, file);
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
    console.log(data)
    return this.http.post(`${this.TAO_URL}/createXMLFolder`, data)
  }
}
