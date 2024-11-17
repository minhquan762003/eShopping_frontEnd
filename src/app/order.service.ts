import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from './order';
import { error } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/orders";
  private data:any;
  constructor() { }
  saveOrder(order:any){
    return this.http.post(`${this.baseUrl}`,order);
  }
  getAllOrdersByUserId(userId: number):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/${userId}`);
  }
}
