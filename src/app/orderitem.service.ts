import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {
  private http = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/orderItems";
  constructor() { }
  getAllOrderItemsByOrderId(orderId:number){
    return this.http.get(`${this.baseUrl}/${orderId}`);
  }
  saveOderItem(data:any){
    return this.http.post(`${this.baseUrl}`,data);
  }
}
