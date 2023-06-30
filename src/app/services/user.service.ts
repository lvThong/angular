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
export class UserService {
    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    listUser(params: any): Observable<any> {
        return this.http.get(`${API_URL}/user${this.commonService.buildQueryString(params)}`, httpOptions);
    }
    createUser(email: string, password: string, fullName: string, address: string, phoneNumber: string, role: number): Observable<any> {
        let params = {
            email,
            password,
            fullName,
            address,
            phoneNumber,
            role
        };
        return this.http.post(`${API_URL}/create-user`, params, httpOptions);
    }
    updateUser(id: number, email: string, fullName: string, address: string, phoneNumber: string, role: number): Observable<any> {
        let params = {
            id,
            email,
            fullName,
            address,
            phoneNumber,
            role

        };
        return this.http.put(`${API_URL}/update-user`, params, httpOptions);
    }
    deleteUser(id: any): Observable<any> {
        return this.http.delete(`${API_URL}/delete-user`,{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id: id } });
    }
    getRole(): Observable<any> {
        return this.http.get(`${API_URL}/get-role`, httpOptions);
    }

}