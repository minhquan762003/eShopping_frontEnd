import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Order } from '../order';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../order.service';
import { OrderitemService } from '../orderitem.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { SuggestionService } from '../suggestion.service';
import { Router } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productService = inject(ProductService);
  products: Product[] | undefined;
  currentUser: User | undefined;
  authService = inject(AuthService);
  orderService = inject(OrderService);
  orderItemService = inject(OrderitemService)
  amount: number = 1;
  newOrderId: any;
  data: any;
  selectedProduct: any = null;
  errorMessage: any;
  successMessage: any;
  searchQuery: string = '';
  suggestionService = inject(SuggestionService);
  suggestions: string[] = [];
  router = inject(Router);
  dataCategory: any;
  userId:any;
  ngOnInit(): void {
    
    this.currentUser = this.authService.getCurrentUser();
    // console.log(this.currentUser?.userId);
    if(this.currentUser){
      this.getAllProducts();
    }else{
      this.authService.logOut();
    }
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }
  increaseTotalAmount() {
    this.amount++;
  }
  decreaseTotalAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  saveOrder(productId: any, price: any) {
    this.userId = this.currentUser?.userId;
    const orderPayload = {
      user: { userId: this.userId },
      totalAmount: this.amount, status: "PENDING", createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.orderService.saveOrder(orderPayload).subscribe((res) => {
      this.data = res;
      // console.log(this.data.data.orderId);
      this.newOrderId = this.data.data.orderId;
      console.log(this.newOrderId);
      console.log(productId);
      this.saveOrderItem(this.newOrderId, productId, this.amount, price);
    }, error => {
      this.errorMessage = "Đặt hàng thất bại";
      console.log(error);
    });
  }

  saveOrderItem(orderId: any, productId: any, quantity: any, price: any) {
    const orderItemPayload = {
      order: { orderId: this.newOrderId },
      product: { productId: productId },
      quantity: quantity,
      price: quantity * price
    }
    this.orderItemService.saveOderItem(orderItemPayload).subscribe((res) => {
      this.successMessage = "Đặt hàng thành công";
      console.log(res);
    }), (error: any) => {
      this.errorMessage = "Đặt hàng thất bại";
      console.log(error)
    }
  }
  getProductBySelectedProductId(id: any) {
    this.productService.findByProductId(id).subscribe((res) => {
      this.selectedProduct = res;
      console.log(this.selectedProduct.data);
      this.successMessage = null;
      this.errorMessage = null;
    }, error => {
      console.log("Loi id");
    })
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


  toSearch(nameProduct: string) {
    this.router.navigate(['search']);
    localStorage.setItem('searchName', nameProduct);
  }
  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = []; // Ẩn gợi ý sau khi chọn
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
