import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Order } from '../../Interfaces/Order';
import { User } from '../../Interfaces/User';
import { UserService } from '../../Services/User/user.service';

@Injectable({
  providedIn: 'root'
})

export class OrderResolver implements Resolve<{ user: User, order: Order }> 
{
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ user: User, order: Order }>
  {
    const id = route.params['id']
    
    return this.userService
      .getOrder(id)
        .pipe(map(response => response)
        )
  }
}