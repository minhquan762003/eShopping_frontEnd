import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import{User} from './user'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/api/users';
  constructor() {
  }
  
  register(user:any){
    return this.http.post(`${this.baseUrl}/register`,user);
  }

  login(username:string, password:string){
    return this.http.post(`${this.baseUrl}/login`,{username, password});
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getAllUsers(){
    return this.http.get(`${this.baseUrl}`);
  }
}
