import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactlistComponent } from './Screens/contactlist/contactlist.component';
import { DashboardComponent } from './Screens/dashboard/dashboard.component';
import { DeliverinstructionsComponent } from './Screens/deliverinstructions/deliverinstructions.component';
import { OrderlistComponent } from './Screens/orderlist/orderlist.component';
import { UserlistComponent } from './Screens/userlist/userlist.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'orderlist', component: OrderlistComponent, pathMatch: 'full' },
      { path: 'contactlist', component: ContactlistComponent, pathMatch: 'full' },
      { path: 'userlist', component: UserlistComponent, pathMatch: 'full' },
      { path: 'deliverinstructions/:id', component: DeliverinstructionsComponent, pathMatch: 'full' }
    ]
  },
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)

export class AdminRoutingModule { }
