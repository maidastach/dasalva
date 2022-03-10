import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guards/Auth/auth.guard';
import { OrderGuard } from 'src/app/Guards/Order/order.guard';
import { UserGuard } from 'src/app/Guards/User/user.guard';
import { AddressResolver } from 'src/app/Resolvers/Address/address.resolver';
import { OrderResolver } from 'src/app/Resolvers/Order/order.resolver';
import { EditShippingComponent } from './Screens/edit-shipping/edit-shipping.component';
import { OrderComponent } from './Screens/order/order.component';
import { PlaceOrderComponent } from './Screens/place-order/place-order.component';
import { ProfileComponent } from './Screens/profile/profile.component';
import { SelectShippingComponent } from './Screens/select-shipping/select-shipping.component';
import { ShippingComponent } from './Screens/shipping/shipping.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
  },
  {
    path: 'shipping',
    component: ShippingComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
  },
  {
    path: 'shipping/:id',
    component: EditShippingComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
  },
  {
    path: 'selectshipping',
    component: SelectShippingComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
  },
  {
    path: 'place-order',
    component: PlaceOrderComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
    resolve: { address: AddressResolver }
  },
  {
    path: 'order/:id',
    component: OrderComponent,
    pathMatch: 'full',
    canActivate: [UserGuard, OrderGuard], //guard to check if order exist and if it is yours
    resolve: { resolver: OrderResolver }
  },
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)

export class UserRoutingModule { }
