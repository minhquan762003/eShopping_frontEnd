import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/products';
  constructor() { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
  findByProductName(name: string) {
    return this.http.get(`${this.baseUrl}/search?name=${name}`);
  }
  findByProductId(productId:any){
    return this.http.get(`${this.baseUrl}/${productId}`);
  }
}
