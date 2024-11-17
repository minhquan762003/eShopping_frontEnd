import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { OrderitemService } from '../orderitem.service';
import { error } from 'console';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orderService = inject(OrderService);
  orders: any;
  authService = inject(AuthService);
  currentUser: any = null;
  orderItemService = inject(OrderitemService);
  orderItemsList: any =[];
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.userId) {
      this.getAllOrdersByUserId(this.currentUser.userId);
    }else{
      console.error;  
    }
  }

  getAllOrdersByUserId(userId: number) {
    this.orderService.getAllOrdersByUserId(userId).subscribe((res) => {
      this.orders = res;
      // console.log(this.orders);
      this.processOrders(this.orders);
      
    })
  }

  getAllOrdersItemByOrderId(orderId:number){
    return this.orderItemService.getAllOrderItemsByOrderId(orderId).toPromise();
  }

  processOrders(orders: any[]){
    const request = orders.map(order => 
      this.getAllOrdersItemByOrderId(order.orderId)
    );
    Promise.all(request).then(results =>{
      this.orderItemsList = results;
      console.log(this.orderItemsList);
    }).catch(error=>{
      console.error("Loi xu ly orders");
    })
  }
}
