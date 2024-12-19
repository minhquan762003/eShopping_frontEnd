import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  currentUser: User|undefined;
  userService = inject(UserService);
  authService = inject(AuthService)
  data :any;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  ngOnInit(): void {
  }
  constructor(private router: Router, private cookieService: CookieService) { }

  login(login:  { username: string, password: string }) {
    this.userService.login(login.username, login.password).subscribe(res => {
      console.log(res);
      this.data = res;
      const userData = this.data.data as {createdAt: string, email: string, password: string, updatedAt: string, userId: number, username: string,token:string}
      this.currentUser = new User(
        userData.username,
        userData.password,
        userData.email,
        userData.token,
        userData.userId,
        new Date(userData.createdAt),
        new Date(userData.updatedAt)
      );

      // console.log(this.currentUser);
      this.authService.setCurrentUser(this.currentUser);
      this.router.navigate(['home']);
      this.errorMessage= null;
      this.successMessage = 'Đăng nhập thành công!';

      const rememberMeChecked = (document.getElementById('flexCheckDefault') as HTMLInputElement).checked;
      if (rememberMeChecked) {
        // Lưu username và token vào cookie
        // this.cookieService.set('username', userData.username, 30); // Lưu cookie username, hết hạn sau 30 ngày
        // this.cookieService.set('token', userData.token, 30); // Lưu cookie token, hết hạn sau 30 ngày
        this.cookieService.set('currentUser', JSON.stringify(this.currentUser), 30); 
      }else{
        this.cookieService.set('currentUser', JSON.stringify(this.currentUser), 1/24); 
      }
    },
    (error: any) =>{
      this.errorMessage = 'Vui lòng kiểm tra lại thông tin đăng nhập.';
    }
    )
  }

}
