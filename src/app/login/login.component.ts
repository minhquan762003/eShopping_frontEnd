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
  userInfo:any;
  currentUser: User|undefined;

  userService = inject(UserService);
  authService = inject(AuthService);
  data :any;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  ngOnInit(): void {
  }
  constructor(private router: Router, private cookieService: CookieService) { }

  login(login:  { username: string, password: string }) {
    this.userService.login(login.username, login.password).subscribe(res => {
      this.data = res;

      this.authService.setToken(this.data.data);
      this.userInfo = this.authService.getUserInformation();
      // console.log(this.userInfo);
      const userData = this.userInfo as {birthDay: number,createdAt: string, email: string, gender:number, name:string,number:string, password: string, role:string,token:string, updatedAt: string, sub: number, username: string,  }
      const birthDay = new Date(userData.birthDay);
      this.currentUser = new User(
        userData.username,
        userData.password,
        userData.email,
        userData.gender,
        userData.token,
        userData.name,
        userData.number,
        birthDay,
        userData.sub,
        new Date(userData.createdAt),
        new Date(userData.updatedAt)
      );

      this.authService.setCurrentUser(this.currentUser);
      console.log(this.authService.getCurrentUser());
      this.router.navigate(['home']);
      this.errorMessage= null;
      this.successMessage = 'Đăng nhập thành công!';

      const rememberMeChecked = (document.getElementById('flexCheckDefault') as HTMLInputElement).checked;
      if (rememberMeChecked) {
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
