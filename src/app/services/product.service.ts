import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://127.0.0.1:8000/api';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // listProducts: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient) {};
    getListProducts(): Observable<any> {
        return this.http.get(AUTH_API + '/product', httpOptions );
    }
    addNewProduct(name: string, category_id: number, image: string, description: string, price: number): Observable<any> {
        return this.http.post(AUTH_API + '/create-product', {
            name,
            category_id,
            description,
            price
        }, httpOptions);
    }
    
    
    
    updateProduct(id: number, name: string, category_id: number, image: string, description: string, price: number): Observable< any> {
        return this.http.post(AUTH_API + '/update-product', {
            id,
            name,
            category_id,
            description,
            price
        }, httpOptions);
    }
    deleteProduct(id: number): Observable< any> {
        return this.http.delete(AUTH_API + '/delete-product', httpOptions);
    }
}
