import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { Order } from 'src/app/Interfaces/Order';
import { Shipping } from 'src/app/Interfaces/User';
import { StripeService } from 'ngx-stripe';

export const stripePublicKey: string = 'pk_live_51ISWUsIJZPLIB8kIUazKZV3cZeC1uFzZLJzHO0MZBN0p9LUf3i8roD6IRnmI4L7r6aH4FRY4sI2Qgcd0ZJyhk73s00l37UWGf2';
  
@Injectable({
  providedIn: 'root'
})

export class MyStripeService
{
  constructor(private http: HttpClient, private stripeService: StripeService) { }

  checkout(id: Order['_id'], shipping: Shipping | null | undefined)
  {
    return this.http.post<{ id: any }>(`/api/stripe/create-checkout-session/${id}`, shipping)
      .pipe(
        switchMap(
          session => this.stripeService.redirectToCheckout({ sessionId: session.id })
        )
      )
  }

}
