import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad 
{
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  {
    return this.authService.
      getUser()
        .pipe(
          map(
            user => 
            {
              if(user?.isAdmin)
                return user.isAdmin
              else
                return this.router.createUrlTree(['/'])
            }
          )
        )
  }
  
}
