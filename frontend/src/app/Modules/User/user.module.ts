import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './Screens/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingComponent } from './Screens/shipping/shipping.component';
import { PlaceOrderComponent } from './Screens/place-order/place-order.component';
import { SelectShippingComponent } from './Screens/select-shipping/select-shipping.component';
import { OrderComponent } from './Screens/order/order.component';
import { EditShippingComponent } from './Screens/edit-shipping/edit-shipping.component';
import { MyStripeService, stripePublicKey } from 'src/app/Services/Stripe/stripe.service';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    ProfileComponent,
    ShippingComponent,
    SelectShippingComponent,
    PlaceOrderComponent,
    OrderComponent,
    EditShippingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStripeModule.forRoot(stripePublicKey),
  ],
  providers: [
    MyStripeService
  ]
})
export class UserModule { }
