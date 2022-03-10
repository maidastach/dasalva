import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Order } from 'src/app/Interfaces/Order';
import { User } from 'src/app/Interfaces/User';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { MyStripeService } from 'src/app/Services/Stripe/stripe.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit 
{
  order!: Order | null;
  user!: User | null;
  deliveryDate!: string;
  payDate!: string;
  currentUser!: User | null;
  loading!: boolean;

  constructor(
    private myStripeService: MyStripeService, 
    private loadingService: LoadingService, 
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void 
  {
    this.order = this.activatedRoute.snapshot.data['resolver'].order
    this.user = this.activatedRoute.snapshot.data['resolver'].user
    this.deliveryDate = new Date(this.order?.deliveredAt || Date.now()).toString().substr(0,21)
    this.payDate = new Date(this.order?.paidAt || Date.now()).toString().substr(0,21)
    this.authService.user.subscribe(user => this.currentUser = user)

    this.loadingService
      .errorMsg
        .subscribe(
          error =>
          {
            if(error)
              this.loading = false
          }
        )
  }

  stripePayment(): void
  {
    this.loading = true
    const id = this.route.snapshot.params['id']
    this.myStripeService
      .checkout(id, this.order?.shipping)
        .subscribe(
          result =>
          {
            this.loading = false;
            if(result.error)
              alert(result.error.message)
          }
        )
  }

}
