import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/products';
  constructor() { }


  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    // console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }
  getAllProducts():Observable<Product[]>{
    const headers = this.createHeaders();
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`, { headers });
  }
  findByProductName(name: string) {
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/search?name=${name}`, { headers });
  }
  findByProductId(productId:any){
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/${productId}`, { headers });
  }
  findByCategory(category:string){
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/category/${category}`, {headers});
  }
}
