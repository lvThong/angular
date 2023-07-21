import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {CommonService} from "./common.service";
import {Observable} from "rxjs";
const API_URL = 'http://localhost:8000/api';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({providedIn: 'root'})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  listCustomer(params: any): Observable<any> {
    return this.http.get(`${API_URL}/customer${this.commonService.buildQueryString(params)}`, httpOptions);
  }
  createCustomer(email: string, fullName: string, address: string, phoneNumber: string): Observable<any> {
    let params = {
      email,
      fullName,
      address,
      phoneNumber,
    };
    return this.http.post(`${API_URL}/create-customer`, params, httpOptions);
  }
  updateCustomer(id: number, email: string, fullName: string, address: string, phoneNumber: string): Observable<any> {
    let params = {
      id,
      email,
      fullName,
      address,
      phoneNumber

    };
    return this.http.put(`${API_URL}/update-customer`, params, httpOptions);
  }
  deleteCustomer(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/delete-customer`,{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id: id } });
  }

}
