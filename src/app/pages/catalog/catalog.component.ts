import { Component } from '@angular/core';
import { ProdutService } from '../../services/produt.service';
import { Router } from '@angular/router';
import { Product } from '../../models/ProductModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  listProduct: any = [];
  constructor(private product: ProdutService, private router: Router) {
    product.getproducto().subscribe((rest) => {
      this.listProduct = rest;

      console.log(this.listProduct);
    });
  }

  addShoppingCard(product: Product) {
    this.product.addToCart(product);

    Swal.fire({
      
      icon: 'success',
      title: 'Producto:' + product.name,
      text: 'Agregado Al Carrito ',
    });
  }

  gottoShoppingCard() {
    this.router.navigate(['shopping']);
  }
}
