import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserService } from 'src/app/Services/User/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad
{
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  {
    return this.authService.
      getUser()
        .pipe(
          map(
            user => 
            {              
              if(user)
                return true
              return this.router.createUrlTree(['/auth/signin'])
            } 
          )
        )  
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    return this.authService.
      getUser()
        .pipe(
          map(
            user => 
            {              
              if(user)
              {                
                if(route.routeConfig?.path === 'place-order')
                {
                    if(this.userService.cartSource.value.length > 0 && this.userService.addressSource.value)
                      return true
                    else if(this.userService.cartSource.value.length > 0 && !this.userService.addressSource.value)
                      return this.router.createUrlTree(['/user/selectshipping'])
                    else
                      return this.router.createUrlTree(['/products'])
                }
                else if(route.routeConfig?.path === 'shipping/:id')
                {
                  if(this.userService.isEditingShippingSource.value)
                    return true
                  else
                    return this.router.createUrlTree(['/user/place-order'])
                }
                else if(route.routeConfig?.path === 'shipping')
                {
                  if(this.authService.userSource.value?.isAddingAddress || !this.authService.userSource.value?.shipping[0])
                    return true
                  else
                    return this.router.createUrlTree(['/user/selectshipping'])
                }
                else if(route.routeConfig?.path === 'selectshipping')
                {
                  if(this.authService.userSource.value?.shipping[0] || this.authService.userSource.value?.isPickingUp)
                    return true
                  else
                    return this.router.createUrlTree(['/user/shipping'])
                }
                else
                  this.router.createUrlTree(['products'])
                return true
              }
              return this.router.createUrlTree(['/auth/signin'])
            } 
          )
        )
  }
  
}
