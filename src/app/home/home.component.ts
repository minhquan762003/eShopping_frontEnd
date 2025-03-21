import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';
import { SuggestionService } from '../suggestion.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: User | undefined;
  authService = inject(AuthService);
  router = inject(Router);
  productService = inject(ProductService);
  products: Product[] | undefined;
  suggestionService = inject(SuggestionService);
  searchQuery: string = '';
  suggestions: string[] = [];
  foundProducts: any = [];
  dataCategory: any;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) { this.getAllProducts(); }
    else {
      this.authService.logOut();
    }
  }

  logOut(){
    this.authService.logOut();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;

    })
  }

  toSearch(nameProduct: string) {
    this.router.navigate(['search']);
    localStorage.setItem('searchName', nameProduct);
  }
  
  findProductByName(productName: string) {
    this.productService.findByProductName(productName).subscribe((res) => {
      console.log(res);
      // this.foundProducts = res;
      // this.products = this.foundProducts;
    }, error => {
      console.log("Loi tim kiem");
    }
    );
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    if (query.trim()) {
      this.suggestionService.getSuggestions(query).subscribe(response => {
        this.suggestions = response;
      });
    } else {
      this.suggestions = [];
    }
  }


  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = [];
  }

  onRadioChange(event: Event): void {
    const radio = event.target as HTMLInputElement;
    if (radio.checked) {
      if (radio.value == "all") {
        this.getAllProducts();
      }
      else {
        this.productService.findByCategory(radio.value).subscribe((res) => {
          this.dataCategory = res;
          this.products = this.dataCategory.data;
        });
      }

    } else {
      this.getAllProducts();
    }
  }

}
