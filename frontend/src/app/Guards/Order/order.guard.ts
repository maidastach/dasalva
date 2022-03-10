import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/Services/User/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate 
{
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const id = route.params['id']
    return this.userService
      .orderGuard(id)
        .pipe(
          map(
            res => res ? res : this.router.createUrlTree(['/user/profile'])
          )
        )
  }
  
}
