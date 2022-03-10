import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './Screens/dashboard/dashboard.component';
import { OrderlistComponent } from './Screens/orderlist/orderlist.component';
import { UserlistComponent } from './Screens/userlist/userlist.component';
import { ContactlistComponent } from './Screens/contactlist/contactlist.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { DeliverinstructionsComponent } from './Screens/deliverinstructions/deliverinstructions.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    OrderlistComponent,
    UserlistComponent,
    ContactlistComponent,
    DeliverinstructionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  bootstrap: [ DashboardComponent ]
})
export class AdminModule { }
