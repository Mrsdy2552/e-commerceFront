import { Component } from '@angular/core';
import { ProdutService } from '../../services/produt.service';
import { CommonModule } from '@angular/common';
import { Product, Product_Item } from '../../models/ProductModel';
import { Router } from '@angular/router';
import { Order, OrderItem } from '../../models/orderModel';
import { OrderService } from '../../services/order.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  produts: Product_Item[] = [];
  constructor(
    private product: ProdutService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.produts = this.product.getItems();
  }
  clearCart() {
    this.produts = this.product.clearCart();
  }
  addToCart(product: Product) {
    this.product.addToCart(product);
  }
  removeToCart(product: Product) {
    this.product.removeToCart(product);
  }
  gotcatalog() {
    this.router.navigate(['catalog']);
  }

  buy() {
    var totalFactura = 0;
    const orderItems: OrderItem[] = [];

    this.produts.forEach((element) => {
      const totalIndividual = element.product.price * element.quantity;
      totalFactura += totalIndividual;

      const orderItem: OrderItem = {
        quantity: element.quantity,
        price: element.product.price,
        product_id: element.product.id,
        order_id: 0,
      };
      orderItems.push(orderItem);
    });

    const customer = localStorage.getItem('customer');
    const customerData = customer ? JSON.parse(customer) : [];

    const order: Order = {
      customer_id: customerData.id,
      total: totalFactura,
      status: 'pending',
    };
    this.orderService.postcreateOrder(order).subscribe((rest) => {
      console.log('Order ID:', rest.id);
      const observables = orderItems.map((item) => {
        item.order_id = rest.id;
        return this.orderService.postcreateOrderItem(item); // No subscribimos aquí aún
      });

      forkJoin(observables).subscribe({
        next: (responses) => {
          this.bill();
        },
        error: (err) => {
          console.error('Error creando los Order Items:', err);
        },
      });
    });
  }
  bill() {
    Swal.fire({
      icon: 'success',
      title: 'Desea volver a comprar ?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `no`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.gotcatalog();
        this.clearCart();
      } else if (result.isDenied) {
        this.clearCart();
        localStorage.removeItem('customer');
        this.router.navigate(['customer']);
      }
    });
  }
}
