import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { OrderitemService } from '../orderitem.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  productService = inject(ProductService);
  nameProduct:any= null;
  foundProducts:any;
  errorMessage: any;
  successMessage:any;
  selectedProduct:any=null;
  amount: number = 1;
  currentUser: any = null;
  orderService = inject(OrderService);
  authService=inject(AuthService);
  data: any;
  newOrderId: any;
  orderItemService=inject(OrderitemService);

  ngOnInit(): void {
    this.nameProduct = localStorage.getItem('searchName');
    // console.log(this.nameProduct);
    this.findProductByName(this.nameProduct);
    this.currentUser = this.authService.getCurrentUser();

  }
  findProductByName(productName:string){
    this.productService.findByProductName(productName).subscribe((res)=>{
      console.log(res);
      this.foundProducts = res;
    },error=>{
      console.log("Loi tim kiem");
    }
  );
  }
  getProductBySelectedProductId(id:any){
    this.productService.findByProductId(id).subscribe((res)=>{
      this.selectedProduct = res;
      console.log(this.selectedProduct.data);
      this.successMessage = null;
      this.errorMessage = null;
    },error=>{
      console.log("Loi id");
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
    const orderPayload = {
      user: { userId: this.currentUser.userId },
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
    },error=>{
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
}
