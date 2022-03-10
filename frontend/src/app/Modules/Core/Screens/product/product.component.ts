import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit
{
  product!: Product;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void
  {
    const id = this.route.snapshot.url[1].path;
    if(!this.productsService.productsSource.value)
      this.productsService
        .getProducts()
          .subscribe(
            products => 
            {
              this.productsService.productsSource.next(products)
              this.product = products.filter(product => product._id === id)[0]
            }
          )
    else
      this.product = this.productsService.productsSource.value.filter(product => product._id === id)[0]      
  }

  addToCart(event: any): void
  {
    event.target.innerText = 'In Cart'
    setTimeout(() => event.target.innerText = 'Add to Cart', 2000)
    this.userService.addToCart(this.product)
  }

}
