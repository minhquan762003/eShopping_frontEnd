import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authService = inject(AuthService);
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/api/users';
  constructor() {
  }
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  register(user: any) {
    const headers = this.createHeaders();
    return this.http.post(`${this.baseUrl}/register`, user, { headers });
  }

  login(username: string, password: string) {
    const headers = this.createHeaders();
    return this.http.post(`${this.baseUrl}/login`, { username, password }, { headers });
  }

  getUserById(id: number) {
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }
  getAllUsers() {
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}`, { headers });
  }
  updateUserByUserId(id: any, user: any) {
    const headers = this.createHeaders();
    return this.http.put(`${this.baseUrl}/update/${id}`,user, { headers });
  }
}
