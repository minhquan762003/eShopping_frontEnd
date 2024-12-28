import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  currentUser:any = null;
  authService = inject(AuthService);
  router = inject(Router);
  productService = inject(ProductService);
  products : Product[] | undefined;
  suggestionService = inject(SuggestionService);
  searchQuery: string = '';
  suggestions: string[] = [];

  dataCategory:any;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    // console.log(this.currentUser);
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
      // console.log(this.products)
    })
  }
  
  toSearch(nameProduct:string){
    this.router.navigate(['search']);
    localStorage.setItem('searchName', nameProduct);
  }
  

  onSearchChange(query: string) {
    this.searchQuery = query;
    if (query.trim()) {
      this.suggestionService.getSuggestions(query).subscribe(response => {
        this.suggestions = response.suggestions;
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = []; // Ẩn gợi ý sau khi chọn
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // console.log(checkbox.value);
      this.productService.findByCategory(checkbox.value).subscribe((res)=>{
        // console.log(res);
        this.dataCategory = res;
        this.products = this.dataCategory.data;
      });
      // console.log('Checkbox đã được tích.');
    } else {
      this.getAllProducts();
      // console.log('Checkbox đã được bỏ tích.');
    }
  }
  
}
