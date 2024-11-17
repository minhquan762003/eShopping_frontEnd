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
export class RegisterComponent implements OnInit{
  userService = inject(UserService);
  errorMessage: string | null = null;
  
  constructor(private router: Router){}
  ngOnInit(): void {
      
  }

  register(register: {username:String, password:string, email:String}){
    this.userService.register(register).subscribe((res)=>{
    console.log(res);
    },(error:any)=>{
      this.errorMessage = "Đăng ký thất bại do trùng username hoặc email. Vui lòng thử username hoặc email khác"
    }
  )
  }
  
}
