import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/Interfaces/Cart';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit
{
  cart!: CartItem[];
  countInStock: number[] = []

  constructor(private userService: UserService)
  {
    for(let i = 1; i < 21; i++)
      this.countInStock.push(i)
  }

  ngOnInit(): void 
  {
    this.userService
      .cart
        .subscribe(
          cart => this.cart = cart
        )
  }

  totalItems(): number
  {
    return this.cart.reduce((a, c) => (a + c.quantity), 0)
  }

  totalSum(): number
  {
    return this.cart.reduce((a, c) => a + c.price * c.quantity, 0)
  }

  deleteItem(event: any): void
  {
    const id: string = event.target.id;
    this.cart = this.cart.filter(x => x._id !== id)
    this.userService
      .cartSource
        .next(this.cart)

    this.userService
      .setCart(this.cart)
        .subscribe()
  }

  updateCart(event: any): void
  {
    const id: string = event.target.id;
    this.cart = this.cart.map(
      x => 
        (x._id === id)
          ? { ...x, quantity: parseInt(event.target.value) }
          : x
    )
    this.userService
      .cartSource
        .next(this.cart)

    this.userService
      .setCart(this.cart)
        .subscribe()
  }

}
