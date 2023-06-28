import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const API_URL = 'http://localhost:8000/api';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({providedIn: 'root'})
export class CustomerService {

    constructor(
        private http: HttpClient,
        
    ){}
    
}