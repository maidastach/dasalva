import { Component, OnInit } from '@angular/core';
import { ContactForm } from 'src/app/Interfaces/Contact';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit 
{
  loading: boolean = true;
  contacts!: ContactForm[];

  constructor(private adminService: AdminService, private loadingService: LoadingService) { }

  ngOnInit(): void 
  {
    this.adminService
      .getContacts()
        .subscribe(
          contacts => 
          {
            this.loading = false
            this.contacts = contacts            
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
