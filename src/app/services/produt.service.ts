import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, Product_Item } from '../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProdutService {
  apiUrl = urlBack + 'products';
  private http = inject(HttpClient);

  constructor() {}

  getproducto() {
    return this.http.get<Product>(this.apiUrl);
  }

  private items: Product_Item[] = [];

  addToCart(product: Product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }
  }
  removeToCart(product: any) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      const existingItem = this.items[existingItemIndex];

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        this.items.splice(existingItemIndex, 1);
      }
    }
  }

  getItems() {
    return this.items;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
}
