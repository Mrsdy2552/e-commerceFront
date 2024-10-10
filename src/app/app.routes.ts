import { Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'shopping',
    component: ShoppingCartComponent,
  },
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full',
  },
];
