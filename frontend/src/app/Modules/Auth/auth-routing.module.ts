import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guards/Auth/auth.guard';
import { NewpasswordComponent } from './Screens/newpassword/newpassword.component';
import { RegisterComponent } from './Screens/register/register.component';
import { ResendtokenComponent } from './Screens/resendtoken/resendtoken.component';
import { ResetpasswordComponent } from './Screens/resetpassword/resetpassword.component';
import { SigninComponent } from './Screens/signin/signin.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'resendtoken',
    component: ResendtokenComponent,
    pathMatch: 'full',
  },
  {
    path: 'password/:token',
    component: NewpasswordComponent,
    pathMatch: 'full',
  },
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)

export class AuthRoutingModule { }
