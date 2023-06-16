import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log('123');
    
    return this.http.post(AUTH_API + '/login', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string, fullName: string, address: string, phoneNumber: string, role: number): Observable<any> {
    return this.http.post(AUTH_API + '/register', {
      email,
      password,
      fullName,
      address, 
      phoneNumber,
      role

    }, httpOptions);
  }
}