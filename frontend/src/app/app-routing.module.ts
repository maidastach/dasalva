import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './Guards/Admin/admin.guard';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { UserGuard } from './Guards/User/user.guard';
import { NotfoundComponent } from './Modules/Core/Screens/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Modules/Core/core.module').then(m => m.CoreModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./Modules/Auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./Modules/User/user.module').then(m => m.UserModule),
    canLoad: [UserGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./Modules/Admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard]
  },
  {
    path: '**', 
    component: NotfoundComponent
  }
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)

export class AppRoutingModule { }
