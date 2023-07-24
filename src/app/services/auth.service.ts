import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';
const AUTH_API = 'http://127.0.0.1:8000/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: TokenStorageService) { }

  login(email: string, password: string): Observable<any> {

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
  isLoggedIn() {
      if (!this.storageService.getUser()){
        return false;
      }
      return true;
  }
  isAdmin() {
    if (!this.storageService.getUser()){
      
      return false;
    }
    if (this.storageService.getUser().role > 3) {
      return false;
    }
    return true;
  }
}
