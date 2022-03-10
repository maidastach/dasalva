import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Shipping } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/Services/User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<Shipping>
{
  constructor(private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Shipping> | Shipping
  {
    if(this.userService.addressSource.value)
      return this.userService.addressSource.value
    return this.userService
      .getSelectedAddress()
        .pipe(
          map(
            address => 
            {
              this.userService.addressSource.next(address)
              return address
            }
          )
        )
  }
}
