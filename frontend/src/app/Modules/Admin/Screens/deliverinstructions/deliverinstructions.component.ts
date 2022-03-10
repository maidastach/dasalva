import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';

@Component({
  selector: 'app-deliverinstructions',
  templateUrl: './deliverinstructions.component.html',
  styleUrls: ['./deliverinstructions.component.scss']
})
export class DeliverinstructionsComponent implements OnInit 
{
  dateForm!: FormGroup;
  loading!: boolean;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private adminService: AdminService, 
    private router: Router, 
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void 
  {
    this.dateForm = this.fb.group(
      {
        day: ['', Validators.required],
        time: ['', Validators.required]
      }
    )
    
    this.loadingService
      .errorMsg
        .subscribe(
          error => {
            if(error)
              this.loading = false
          } 
        )

  }

  sendIntructions()
  {
    if(confirm('Send Instructions?'))
    {
      this.loading = true;
      const id: string = this.route.snapshot.params['id']

      this.adminService
        .sendInstructions({ ...this.dateForm.value, id })
          .subscribe(
            order$ =>
            {
              this.loading = false;
              this.dateForm.reset()
              this.router.navigate(['/admin/orderlist'])
            }
          )
    }
  }

}
