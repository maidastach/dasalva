import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { Order } from 'src/app/Interfaces/Order';
import { Shipping } from 'src/app/Interfaces/User';
import { StripeService } from 'ngx-stripe';

export const stripePublicKey: string = '****************************************';
  
@Injectable({
  providedIn: 'root'
})

export class MyStripeService
{
  constructor(private http: HttpClient, private stripeService: StripeService) { }

  checkout(id: Order['_id'], shipping: Shipping | null | undefined)
  {
    return this.http.post<{ id: any }>(`/**************************`, shipping)
      .pipe(
        switchMap(
          session => this.stripeService.redirectToCheckout({ sessionId: session.id })
        )
      )
  }

}
