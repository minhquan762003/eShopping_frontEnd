import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor() {
    if (this.isBrowser()){
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }
  private isBrowser(): boolean { return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'; }
  setCurrentUser(user: User) {
    this.currentUser = user;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logOut() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

}
