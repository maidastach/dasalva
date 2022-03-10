import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/User';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit 
{
  loading: boolean = true;
  users!: User[];

  constructor(private adminService: AdminService, private loadingService: LoadingService) { }

  ngOnInit(): void 
  {
    this.adminService
      .getUsers()
        .subscribe(
          users => 
          {
            this.loading = false
            this.users = users
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
  }

}
