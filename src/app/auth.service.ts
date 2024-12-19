import { Injectable } from '@angular/core';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUser: any = null;
  private token: any;
  constructor(private cookieService: CookieService) {
    if (this.isBrowser()) {
      const savedUser = this.cookieService.get('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logOut() {
    this.currentUser = null;
    this.cookieService.delete('currentUser');
  }

  setToken(token: any) {
    this.token = token;
  }

  getToken() {

    if (this.currentUser) {
      this.token = this.currentUser.token;
      return this.token;
    }
  }
}
