import { Component, OnInit } from '@angular/core';
import { OrderForAdmin } from 'src/app/Interfaces/Order';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit 
{
  loading: boolean = true;
  orders!: OrderForAdmin[];

  constructor(private adminService: AdminService, private loadingService: LoadingService) { }

  ngOnInit(): void 
  {
    this.adminService
      .getOrders()
        .subscribe(
          orders => 
          {
            this.loading = false
            this.orders = orders            
          }
        )
    this.loadingService
      .errorMsg
        .subscribe(
          error =>
          {
            if(error)
              this.loading = false
          }
        )
    this.loadingService
      .successMsg
        .subscribe(
          success =>
          {
            if(success)
              this.loading = false
          }
        )
  }

  deleteOrder(id: string)
  {
    if(confirm('Delete Order?'))
    {
      this.loading = true;
      this.adminService
        .deleteOrder(id)
          .subscribe(
            order$ =>
            {
              this.loadingService.successMsgSource.next('Order Deleted!')
              this.orders = this.orders.filter(order => order._id !==  order$._id)
            }
          )
    }
  }

  deliverOrder(id: string)
  {
    if(confirm('Deliver Order?'))
    {
      this.loading = true;
      this.adminService
        .deliverOrder(id)
          .subscribe(
            order$ =>
            {
              this.loadingService.successMsgSource.next('Order Delivered!')
              this.orders = this.orders.map(
                order => 
                {
                  if(order._id?.toString() === id)
                    return order$
                  return order
                }
              )
            }
          )
    }
  }

}