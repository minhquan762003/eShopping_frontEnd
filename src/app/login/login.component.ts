import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { error } from 'node:console';
import { AuthService } from '../auth.service';
import { User } from '../user';

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
  constructor(private router: Router) { }

  login(login:  { username: string, password: string }) {
    this.userService.login(login.username, login.password).subscribe(res => {
      this.data = res;
      const userData = this.data.data as {createdAt: string, email: string, password: string, updatedAt: string, userId: number, username: string}
      this.currentUser = new User(
        userData.username,
        userData.password,
        userData.email,
        userData.userId,
        new Date(userData.createdAt),
        new Date(userData.updatedAt)
      );

      // console.log(this.currentUser);
      this.authService.setCurrentUser(this.currentUser);
      this.router.navigate(['home']);
      this.errorMessage= null;
      this.successMessage = 'Đăng nhập thành công!';
    },
    (error: any) =>{
      this.errorMessage = 'Vui lòng kiểm tra lại thông tin đăng nhập.';
    }
    )
  }

}
