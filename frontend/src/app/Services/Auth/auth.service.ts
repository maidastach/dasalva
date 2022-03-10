import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile, Register, SignIn, User } from 'src/app/Interfaces/User';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  userSource = new BehaviorSubject<User | null>(null)
  user = this.userSource.asObservable()

  constructor(private http: HttpClient, private userService: UserService) 
  {
    this.getUser()
      .subscribe(
        user => 
        {
          if(user)
          {
            this.userSource.next(user)
            this.userService
              .getCart()
                .subscribe(
                  cart => this.userService.cartSource.next(cart)
                )
          }
        }
      )
  }

  

  getUser(): Observable<User | null>
  {
    return this.http.get<User | null>('/api/auth/amilogged')
  }

  signIn(user: SignIn): Observable<User>
  {
    return this.http.post<User>('/api/auth/signin', user)
  }

  registerUser(user: Register): Observable<User>
  {
    return this.http.post<User>('/api/auth/register', user)
  }

  logOut(): Observable<any>
  {
    return this.http.get<any>('/api/auth/logout')
  }

  updateProfile(profile: Profile): Observable<{data: User, message: string}>
  {
    return this.http.post<{data: User, message: string}>('/api/auth/profile', profile)
  }

  resetPassword(email: User['email']): Observable<User['email']>
  {
    return this.http.post<User['email']>('/api/auth/resetpassword', { email })
  }

  updatePassword(form: { email: User['email'], password: User['password'], token: string }): Observable<User>
  {
    return this.http.post<User>('/api/auth/newpassword', form)
  }

  resendToken(email: User['email']): Observable<User['email']>
  {
    return this.http.post<User['email']>('/api/auth/resendtoken', { email })
  }

}
