import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products!: Product[];

  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void
  {
    if(!this.ProductsService.productsSource.value)
      this.ProductsService
        .getProducts()
          .subscribe(
            products => 
            {
              this.ProductsService.productsSource.next(products)
              this.products = products
            }
          )
    else
      this.products = this.ProductsService.productsSource.value
         
  }
}
