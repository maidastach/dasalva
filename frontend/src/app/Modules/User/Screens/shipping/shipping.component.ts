import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { UserService } from 'src/app/Services/User/user.service';

export function validatePostalCode(c: FormControl)
{
  const num: string = c.value;

  if(
    num.length === 4 
    && parseInt(num) < 2235 
    && parseInt(num) > 1999
  )
    return null

  return { validatePostalCode: { valid: false } };
};

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})

export class ShippingComponent implements OnInit, AfterViewInit
{
  shippingForm!: FormGroup;
  loading!: boolean;
  @ViewChild('address') address!: ElementRef;

  constructor(
    private location: Location, 
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router, 
    private authService: AuthService,
    private loadingService: LoadingService
    ) { }

  ngAfterViewInit(): void 
  {
    this.address.nativeElement.focus()
  }

  ngOnInit(): void
  {
    this.shippingForm = this.fb.group(
      {
        addressA: ['', Validators.required],
        addressB: [''],
        city: ['', Validators.required],
        postalCode: ['', validatePostalCode],
        state: ['NSW', Validators.required],
      }
    )
    this.loadingService
      .errorMsg
        .subscribe(
          error => 
          {
            if(error)
            {
              this.loading = false
              if(error.includes('Login Again'))
                this.authService
                  .logOut()
                    .subscribe()
            }
          }
        )
  }

  addShippingAddress(): void
  {
    this.loading = true;
    this.userService
      .addShippingAddress(this.shippingForm.value)
        .subscribe(
          response =>
          {
            this.authService.userSource.next(response.user)
            this.userService.addressSource.next(response.address)
            this.loading = false;
            this.router.navigate(['/user/place-order'])
          }
        )
  }

  backButton(): void
  {
    this.location.back();
  }
  
  pickupButton(): void
  {
    this.userService
      .isPickingUp()
        .subscribe(
          user => 
          {
            this.authService.userSource.next(user)
            this.loading = false;
            this.router.navigate(['/user/selectshipping'])
          }
        )
  }

}
