import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
const API_URL = 'http://localhost:8000/api';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    listOrder(params: any): Observable<any> {
        return this.http.get(`${API_URL}/order${this.commonService.buildQueryString(params)}`, httpOptions);
    }
    getDetailOrder(params: any): Observable<any> {
        return this.http.get(`${API_URL}/get-detail-order${this.commonService.buildQueryString(params)}`, httpOptions);
    }
    createOrder(): Observable<any> {
        let params = {
       
        };
        return this.http.post(`${API_URL}/create-order`, params, httpOptions);
    }
    updateOrder(): Observable<any> {
        let params = {
      
        };
        return this.http.put(`${API_URL}/update-order`, params, httpOptions);
    }
    deleteOrder(id: any): Observable<any> {
        return this.http.delete(`${API_URL}/delete-order`,{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id: id } });
    }
    

}