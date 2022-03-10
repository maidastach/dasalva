import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/Interfaces/Cart';
import { Product } from 'src/app/Interfaces/Product';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit 
{
  products!: Product[];
  cart!: CartItem[];

  constructor(private productsService: ProductsService, private userService: UserService){ }

  ngOnInit(): void
  {
    if(!this.productsService.productsSource.value)
      this.productsService
        .getProducts()
          .subscribe(
            products => 
            {
              this.productsService.productsSource.next(products)
              this.products = products
            }
          )
    else
      this.products = this.productsService.productsSource.value
        
    this.userService.cart.subscribe(cart => this.cart = cart)
  }

  addToCart(event: any): void
  {
    const id: string = event.target.id;
    const product: Product = this.products.filter(x => x._id === id)[0];
    event.target.innerText = 'In Cart'
    setTimeout(() => event.target.innerText = 'Add to Cart', 2000)
    this.userService
      .addToCart(product)
  }

}
