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
  currentUser: any = null;
  authService = inject(AuthService);
  orderService = inject(OrderService);
  orderItemService = inject(OrderitemService)
  amount: number = 1;
  newOrderId: any;
  data: any;
  selectedProduct:any=null;
  errorMessage: any;
  successMessage:any;
  ngOnInit(): void {
    this.getAllProducts();
    this.currentUser = this.authService.getCurrentUser();

  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      console.log(this.products)
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
}
