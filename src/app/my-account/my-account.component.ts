import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{
  authService = inject(AuthService);
  gender: number|undefined;
  currentUser: User|undefined;
  name :any;
  number:any;
  birthDay:string|undefined;
  userService = inject(UserService);
  respon:any;
  successMessage:any;
  ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      if(this.currentUser){
        this.number = this.currentUser.number;
        this.gender =  this.currentUser.gender;
        this.name = this.currentUser.name;
        // this.birthDay = this.currentUser.birthDay as string;
        console.log(this.birthDay);
      }
  }


  update(update: { name: string,  gender: number , number:string}){
    this.userService.updateUserByUserId(this.currentUser?.getUserId,update).subscribe( (res)=> {
      this.respon = res;
      if(this.respon.status = "ok"){
        this.successMessage = "Sửa thông tin thành công, đăng nhập lại để hoàn thiện sửa đổi";
      }
    });
  }
}
