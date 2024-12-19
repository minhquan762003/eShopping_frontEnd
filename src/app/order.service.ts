import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from './order';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  private baseUrl = "http://localhost:8080/api/orders";

  constructor() {}

  // Hàm tạo headers động với token
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Lấy token từ AuthService
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Gắn token vào headers
    });
  }

  // Lưu đơn hàng
  saveOrder(order: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.baseUrl}`, order, { headers });
  }

  // Lấy tất cả đơn hàng theo User ID
  getAllOrdersByUserId(userId: number): Observable<Order[]> {
    const headers = this.createHeaders();
    return this.http.get<Order[]>(`${this.baseUrl}/${userId}`, { headers });
  }
}
