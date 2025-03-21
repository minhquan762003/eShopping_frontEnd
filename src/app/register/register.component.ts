import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userService = inject(UserService);
  errorMessage: string | null = null;
  data: any;
  router = inject(Router);
  successMessage: any;
  constructor() { }
  ngOnInit(): void { 

  }

  register(register: { username: String, password: string, email: String, name: string, number: string, birthDay: Date, gender: number, role?: string }) {
    if (!register.role) {
      register.role = "USER";
    }
    this.userService.register(register).subscribe((res) => {
      this.data = res;
      if (this.data.status == "failed") {
        this.errorMessage = "Đăng ký thất bại do trùng username hoặc email. Vui lòng thử username hoặc email khác"
      } else {
        this.successMessage = "Đăng ký thành công";
        this.router.navigate(['login']);
      }
      console.log(res);
    }
    )
  }

}
