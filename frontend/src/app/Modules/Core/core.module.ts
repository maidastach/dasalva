import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Screens/home/home.component';
import { ProductsComponent } from './Screens/products/products.component';
import { ProductComponent } from './Screens/product/product.component';
import { InfoComponent } from './Screens/info/info.component';
import { ContactComponent } from './Screens/contact/contact.component';
import { CartComponent } from './Screens/cart/cart.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeroComponent } from './Components/hero/hero.component';
import { ShopComponent } from './Components/shop/shop.component';
import { AboutComponent } from './Components/about/about.component';
import { DescriptionComponent } from './Components/description/description.component';
import { BottomdetailsComponent } from './Components/bottomdetails/bottomdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './Screens/notfound/notfound.component';

@NgModule(
  {
    declarations: [
      HomeComponent,
      ProductsComponent,
      ProductComponent,
      InfoComponent,
      ContactComponent,
      CartComponent,
      HeroComponent,
      ShopComponent,
      AboutComponent,
      DescriptionComponent,
      BottomdetailsComponent,
      NotfoundComponent,
    ],
    imports: [
      CommonModule,
      CoreRoutingModule,
      ReactiveFormsModule,
    ],
    bootstrap: [ HomeComponent ]
  }
)

export class CoreModule { }
