import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Screens/cart/cart.component';
import { ContactComponent } from './Screens/contact/contact.component';
import { HomeComponent } from './Screens/home/home.component';
import { InfoComponent } from './Screens/info/info.component';
import { ProductComponent } from './Screens/product/product.component';
import { ProductsComponent } from './Screens/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'info',
    component: InfoComponent,
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
    pathMatch: 'full'
  },
  {
    path: 'products/:id',
    component: ProductComponent,
    pathMatch: 'full'
  },
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)

export class CoreRoutingModule { }
