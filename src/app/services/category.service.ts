import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { CommonService } from "./common.service";
const AUTH_API = 'http://127.0.0.1:8000/api';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private http: HttpClient,
        private commonService: CommonService
        ) {}
    getListCategories(params: any): Observable<any> {

        return this.http.get(`${AUTH_API}/category${this.commonService.buildQueryString(params)}`, httpOptions);
    }
}
