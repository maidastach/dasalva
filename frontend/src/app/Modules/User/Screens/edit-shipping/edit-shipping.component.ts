import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Shipping } from 'src/app/Interfaces/User';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { UserService } from 'src/app/Services/User/user.service';
import { validatePostalCode } from '../shipping/shipping.component';

@Component({
  selector: 'app-edit-shipping',
  templateUrl: './edit-shipping.component.html',
  styleUrls: ['./edit-shipping.component.scss']
})
export class EditShippingComponent implements OnInit {

  shippingForm!: FormGroup;
  shipping!: Shipping | null;
  loading!: boolean;

  constructor(
    private location: Location, 
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router, 
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void 
  {
    this.shipping = this.userService.addressSource.value
      
    this.shippingForm = this.fb.group(
      {
        addressA: [this.shipping?.addressA, Validators.required],
        addressB: [this.shipping?.addressB],
        city: [this.shipping?.city, Validators.required],
        postalCode: ['', validatePostalCode],
        state: ['NSW', Validators.required],
        _id: [this.shipping?._id]
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

  editShippingAddress(): void
  {
    this.loading = true
    this.userService
      .editShippingAddress(this.shippingForm.value)
        .subscribe(
          response =>
          {
            this.authService.userSource.next(response.user)
            this.userService.addressSource.next(response.findAddress)
            this.loading = false
            this.router.navigate(['/user/place-order'])
          }
        )
  }

  backButton(): void
  {
    this.location.back();
  }

}
