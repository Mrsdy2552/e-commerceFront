import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order, OrderItem, OrderResponse } from '../models/orderModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'http://localhost:8080/api/Order';
  apiUrlItem = 'http://localhost:8080/api/OrderItem';
  private http = inject(HttpClient);

  constructor() {}

  postcreateOrder(order: Order) {
    return this.http.post<OrderResponse>(this.apiUrl, order);
  }
  postcreateOrderItem(order: OrderItem) {
    return this.http.post<any>(this.apiUrlItem, order);
  }
}
