import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;
  constructor(
    private http: HttpClient,
  ) { }


  register(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data)
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }
  isLoggedIn() {
    return localStorage.getItem('token');
  }
  gettoken() {
    localStorage.getItem('token');
  }
}
