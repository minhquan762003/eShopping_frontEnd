import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  currentUser:any = null;
  authService = inject(AuthService)
  router = inject(Router)
  productService = inject(ProductService)
  products : Product[] | undefined;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
    this.getAllProducts();
  }
  logOut(){
    this.authService.logOut();
    this.router.navigate(['home']);
    this.currentUser = null;
  }
  logIn(){
    this.router.navigate(['login'])
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(res=>{
      this.products = res;
      console.log(this.products)
    })
  }
  toSearch(nameProduct:string){
    this.router.navigate(['search']);
    localStorage.setItem('searchName', nameProduct);
  }
  
}
