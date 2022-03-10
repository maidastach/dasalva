import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment } from '@angular/router';
import { Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad
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
              if(user)
                return this.router.createUrlTree(['/products'])
              else
                return true
            } 
          )
        )  
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    return this.authService.
      getUser()
        .pipe(
          map(
            user => 
            {
              if(user)
                return this.router.createUrlTree(['/products'])
              else
                return true
            } 
          )
        )
  }
}
