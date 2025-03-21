import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | undefined;
  private router = inject(Router);

  constructor() { }

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("accessToken", token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem("accessToken");
    }
    return null;
  }

  removeToken() {
    if(typeof window !== 'undefined' && window.localStorage){

      localStorage.removeItem("accessToken");
    }
  }

  getUserInformation() {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token);

      return decoded;
    }
    return null;
  }
  setCurrentUser(currentUser: User | undefined) {
    this.currentUser = currentUser;
    if (currentUser && typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  getCurrentUser(): User | undefined {
    if (!this.currentUser && typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser ?? undefined;
  }

  logOut() {
    if(typeof window !== 'undefined' && window.localStorage){
      typeof window !== 'undefined' && window.localStorage
    }
  }
  
}
