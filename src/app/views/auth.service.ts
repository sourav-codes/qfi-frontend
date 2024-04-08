// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from './../../../src/environments/environment';
@Injectable({
 providedIn: 'root'
})
export class AuthService {
 apiUrl: string = environment.apiUrl;


 constructor(private http: HttpClient) { }

 registerUser(newUser: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/User/register', newUser);
 }

 loginUser(email: string, password: string): Observable<any> {
   const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
   };
    return this.http.post(this.apiUrl + '/v1/auth/login', { email, password });
 }

 public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
 }

 logout() {
   localStorage.removeItem('authToken');
   window.location.href = '/login';
}

}
