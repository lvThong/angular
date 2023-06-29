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

    listUser(page: number, limit: number, ):Observable <any> {
        let params = {
            page: page,
            limit: limit
        };
        return this.http.get(`${API_URL}/user${this.commonService.buildQueryString(params)}`, httpOptions);
    }
    createUser():Observable <any> {
        let params = {};
        return this.http.post(`${API_URL}/user`, params, httpOptions);
    }
    updateUser():Observable <any> {
        let params = {};
        return this.http.put(`${API_URL}/user`,params, httpOptions);
    }
    deleteUser(id: string):Observable <any> {
        return this.http.delete(`${API_URL}/user`, httpOptions);
    }   
    getRole(): Observable <any> {
        return this.http.get(`${API_URL}/get-role`, httpOptions);
    }
    
 }