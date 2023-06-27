import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://127.0.0.1:8000/api';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // listProducts: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient) { };
    getListProducts(page: number, limit: number): Observable<any> {
        return this.http.get(AUTH_API + `/product?page=${page}&limit=${limit}`);
    }
    addNewProduct(name: string, category_id: number, image: string, description: string, price: number): Observable<any> {
        return this.http.post(AUTH_API + '/create-product', {
            name,
            category_id,
            image,
            description,
            price
        }, httpOptions);
    }



    updateProduct(id: number, name: string, category_id: number, image: string, description: string, price: number): Observable<any> {
        return this.http.post(AUTH_API + '/update-product', {
            id,
            name,
            category_id,
            description,
            price,
            image
        }, httpOptions);
    }
    deleteProduct(id: number): Observable<any> {
       
        return this.http.delete(AUTH_API + '/delete-product', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id: id } });
    }
    findProduct(id: number, name: string, category: number, page: number, limit: number): Observable<any> {
        console.log(id,name, category, page, limit);
        return this.http.get(AUTH_API + `/product?page=${page}&limit=${limit}&id=${id}&name=${name}&category=${category}`, httpOptions)
    }
}
