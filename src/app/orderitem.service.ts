import { HttpClient , HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OrderitemService {
  private authService = inject(AuthService);
  private http = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/orderItems";
  constructor() { }
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Lấy token từ AuthService
    // console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Gắn token vào headers
    });
  }
  getAllOrderItemsByOrderId(orderId:number){
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/${orderId}`,{headers});
  }
  saveOderItem(data:any){
    const headers = this.createHeaders();

    return this.http.post(`${this.baseUrl}`,data,{headers});
  }
}
