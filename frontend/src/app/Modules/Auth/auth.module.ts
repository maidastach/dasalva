import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Screens/register/register.component';
import { SigninComponent } from './Screens/signin/signin.component';
import { ResetpasswordComponent } from './Screens/resetpassword/resetpassword.component';
import { NewpasswordComponent } from './Screens/newpassword/newpassword.component';
import { ResendtokenComponent } from './Screens/resendtoken/resendtoken.component';



@NgModule({
  declarations: [
    RegisterComponent,
    SigninComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    ResendtokenComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
