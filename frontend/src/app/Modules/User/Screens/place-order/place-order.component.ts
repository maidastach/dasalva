import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/Interfaces/Cart';
import { Order } from 'src/app/Interfaces/Order';
import { Shipping, User } from 'src/app/Interfaces/User';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit 
{

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
    ) { }

  user!: User | null;
  shipping!: Shipping;
  cart!: CartItem[];
  payment = { paymentMethod: 'Stripe' };
  postcodes = [2040, 2042, 2043, 2044, 2045, 2048, 2049, 2050, 2051, 2052]
  itemsPrice!: number;
  isNearMe!: boolean;
  shippingPrice!: number;
  taxPrice: number = 0;
  totalPrice!: number;
  loading!: boolean;

  ngOnInit(): void 
  {
    this.shipping = this.activatedRoute.snapshot.data['address']

    //this.authService.user.subscribe(user => this.user = user)
    this.cart = this.userService.cartSource.value
    this.user = this.authService.userSource.value

    this.itemsPrice = this.cart.reduce((a, c) => a + c.price * c.quantity, 0);
    this.isNearMe = ((Number(this.shipping?.postalCode) < 2038) || (this.postcodes.includes(Number(this.shipping?.postalCode))));
    this.shippingPrice = this.shipping._id === '0' ? 0 : (this.isNearMe && (this.itemsPrice >= 50)) ? 0 : 15;
    //this.taxPrice = parseFloat((0.10 * this.itemsPrice).toFixed(2));

    this.totalPrice = this.itemsPrice + this.shippingPrice;

    this.loadingService
      .errorMsg
        .subscribe(
          error =>
          {
            if(error)
            {
              this.loading = false
              this.router.navigate(['/user/profile'])
            }
          }
        )
  }

  editShipping(): void
  {
    this.userService.isEditingShippingSource.next(true)
    this.router.navigate([`/user/shipping/${this.shipping?._id}`])    
  }

  createOrder(): void
  {
    this.loading = true;
    const order: Order = 
    {
      orderItems: this.cart,
      user: this.user?._id,
      shipping: this.shipping,
      payment: this.payment,
      itemsPrice: this.itemsPrice,
      taxPrice: this.taxPrice,
      shippingPrice: this.shippingPrice,
      totalPrice: this.totalPrice,
      isPickUp: this.user?.isPickingUp,
      fname: this.user?.fname,
      email: this.user?.email,
    }
    this.userService
      .createOrder(order)
        .subscribe(
          order =>
          {
            this.loading= false;
            this.userService.orderSource.next(order)
            this.userService.cartSource.next([])
            this.userService.setCart([]).subscribe()
            this.router.navigate([`/user/order/${order._id}`])
          }
        )
  }

}