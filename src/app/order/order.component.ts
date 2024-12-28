import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { OrderitemService } from '../orderitem.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { SuggestionService } from '../suggestion.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orderService = inject(OrderService);
  orders: any;
  authService = inject(AuthService);
  currentUser: any = null;
  orderItemService = inject(OrderitemService);
  suggestions: string[] = [];

  orderItems: any;
  selectedOrderItemId: any;
  selectedOrderId: any;
  successMessage: any;
  errorMessage:any;
  respone: any;
  searchQuery: string = '';
  suggestionService = inject(SuggestionService);
  orderList: any = [];
  dataCategory: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.userId) {
      this.getAllOrdersByUserId(this.currentUser.userId);
    } else {
      console.error;
    }
  }

  getAllOrdersByUserId(userId: number) {
    this.orderService.getAllOrdersByUserId(userId).subscribe((res) => {
      this.orders = res;
      this.orderList = this.orders
      console.log(this.orders);
      // this.processOrders(this.orders);

    })
  }

  getAllOrdersItemByOrderId(orderId: number) {
    return this.orderItemService.getAllOrderItemsByOrderId(orderId).subscribe((res) => {
      // console.log(res);
      this.orderItems = res;
    });
  }

  // getAllOrdersItemByOrderId(orderId: number) {
  //   return this.orderItemService.getAllOrderItemsByOrderId(orderId).toPromise();
  // }

  // processOrders(orders: any[]) {
  //   const request = orders.map(order =>
  //     this.getAllOrdersItemByOrderId(order.orderId)
  //   );
  //   Promise.all(request).then(results => {
  //     this.orderItemsList = results;
  //     console.log(this.orderItemsList);
  //   }).catch(error => {
  //     console.error("Loi xu ly orders");
  //   })
  // }

  getSelectedOrderItemId(orderItemId: any) {
    this.selectedOrderItemId = orderItemId;
    console.log(this.selectedOrderItemId);
  }

  getSelectedOrderId(orderId: any) {
    this.selectedOrderId = orderId;
    // console.log(this.selectedOrderId);
    this.getAllOrdersItemByOrderId(this.selectedOrderId);
    this.successMessage = null;
  }

  deleteSelectedOrderItemByOrderItemId(orderItemId: any) {
    this.orderItemService.deleteOrderItemByOrderItemId(orderItemId).subscribe(
      (res) => {
        console.log(res);
        this.respone = res;

        if (this.respone.status === 'ok') {
          this.successMessage = 'Hủy mặt hàng thành công';
          // Cập nhật danh sách order items
          this.getAllOrdersItemByOrderId(this.selectedOrderId);
        }
      },
      (err) => {
        console.error('Lỗi khi xóa mặt hàng:', err);
      }
    );
  }

  deleteSelectedOrderByOrderId(orderId: any) {
    this.orderService.deleteOrderByOrderId(orderId).subscribe(
      (res) => {
        console.log(res);
        this.respone = res;

        if (this.respone.status === 'ok') {
          this.successMessage = 'Xóa đơn hàng thành công';
          // Cập nhật danh sách đơn hàng
          this.getAllOrdersByUserId(this.currentUser.userId);
        }else{
          this.errorMessage = 'Bạn cần phải hủy các mặt hàng trước khi xóa đơn hàng.';
        }
      },
      (err) => {
        console.error('Lỗi khi xóa đơn hàng:', err);
      }
    );
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
  toSearch(nameProduct:string){
    this.router.navigate(['search']);
    localStorage.setItem('searchName', nameProduct);
  }
  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = []; // Ẩn gợi ý sau khi chọn
  }
}
