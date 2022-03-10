import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/Interfaces/Order';
import { User } from 'src/app/Interfaces/User';
import { passwordValidator, telephoneValidator } from 'src/app/Modules/Auth/auth-validators';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit 
{
  user!: User | null;
  profileForm!: FormGroup;
  orders!: Order[] | null;
  showPasswordForm: boolean = false;
  loading!: boolean;

  constructor(
    private fb: FormBuilder, 
    private loadingService: LoadingService,
    private authService: AuthService, 
    private router: Router, 
    private userService: UserService) { }

  ngOnInit(): void
  {
    this.user = this.authService.userSource.value;
    this.profileForm = this.fb.group(
      {
        fname: [this.user?.fname, [Validators.minLength(3), Validators.required]],
        lname: [this.user?.lname, [Validators.minLength(3), Validators.required]],
        email: [this.user?.email, [Validators.required]],
        address: [false],
        telephone: [this.user?.telephone, [telephoneValidator, Validators.minLength(8), Validators.maxLength(12), Validators.required]],
        oldPassword: ['', [Validators.required]],
        newPassword: [''],
        repassword: [''],
      }
    )
    this.profileForm.controls['email'].disable()
    this.profileForm.controls['address']
      .valueChanges
        .subscribe(
          event => 
          {
            if(event === 'false')
              this.profileForm.controls['address'].patchValue(false)
          }
        )

    this.authService
      .user
        .subscribe(
          user => this.user = user
        )

    this.userService
      .getUserOrders()
        .subscribe(
          orders => this.orders = orders           
        )
    
    this.profileForm
      .controls['newPassword']
        .valueChanges
          .subscribe(
            event =>
            {
              if(event)
                if(
                    !this.profileForm.controls['newPassword'].hasValidator(Validators.required)
                    && !this.profileForm.controls['repassword'].hasValidator(Validators.required)
                  )
                {
                  this.profileForm.controls['newPassword'].setValidators([Validators.required, passwordValidator])
                  this.profileForm.controls['newPassword'].updateValueAndValidity({onlySelf: true})

                  this.profileForm.controls['repassword'].setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)])
                  this.profileForm.controls['repassword'].updateValueAndValidity({onlySelf: true})
                }
              else
                if(
                    this.profileForm.controls['newPassword'].hasValidator(Validators.required)
                    && this.profileForm.controls['repassword'].hasValidator(Validators.required)
                  )
                {
                  this.profileForm.controls['newPassword'].removeValidators([Validators.required, passwordValidator])
                  this.profileForm.controls['newPassword'].updateValueAndValidity({onlySelf: true})

                  this.profileForm.controls['repassword'].removeValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)])
                  this.profileForm.controls['repassword'].updateValueAndValidity({onlySelf: true})
                }
            }
          )
    this.loadingService
      .errorMsg
        .subscribe(
          error =>
          {
            if(error)
            {
              this.loading = false;
              this.profileForm.controls['oldPassword'].reset()
              this.profileForm.controls['newPassword'].reset()
              this.profileForm.controls['repassword'].reset()
            }
          }
        )
  }

  updateProfile(): void
  {
    this.loading = true
    if(this.profileForm.value.newPassword === this.profileForm.value.repassword)
    {
      this.authService
        .updateProfile({...this.profileForm.value, email: this.user?.email})
          .subscribe(
            res => 
            { 
              this.loading = false
              this.showPasswordForm = false
              this.profileForm.controls['oldPassword'].reset()
              this.profileForm.controls['newPassword'].reset()
              this.profileForm.controls['repassword'].reset()
              this.loadingService.successMsgSource.next(res.message)
              this.authService.userSource.next(res.data) 
            }
          )
    }
    else
    {
      this.loading = false
      this.profileForm
        .controls['repassword']
          .setErrors(
            { 'notMatching': { valid: false } }
          )
      this.loadingService
        .errorMsgSource
          .next('Passwords do not match')
    }
  }

  handleView(): void
  {
    if(this.showPasswordForm)
    {
      this.profileForm.controls['newPassword'].patchValue('')
      this.profileForm.controls['repassword'].patchValue('')
      if(
        this.profileForm.controls['newPassword'].hasValidator(Validators.required)
        && this.profileForm.controls['repassword'].hasValidator(Validators.required)
      )
      {
        this.profileForm.controls['newPassword'].removeValidators([Validators.required, passwordValidator])
        this.profileForm.controls['newPassword'].updateValueAndValidity({onlySelf: true})

        this.profileForm.controls['repassword'].removeValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)])
        this.profileForm.controls['repassword'].updateValueAndValidity({onlySelf: true})
      }
      this.showPasswordForm = false
    }
    else
      this.showPasswordForm = true
  }

  deleteAddress(): void
  {
    this.userService
      .deleteShippingAddress(this.profileForm.controls['address'].value)
        .subscribe(
          user => this.authService.userSource.next(user)
        )
  }

  editAddress(): void
  {
    this.userService.isEditingShippingSource.next(true)
    this.router.navigate([`/user/shipping/${this.profileForm.controls['address'].value}`])
  }

  createAddress(): void
  {
    this.userService.isEditingShippingSource.next(true)
    this.router.navigate(['/user/shipping'])
  }

  logOut(): void
  {
    this.authService
      .logOut()
        .subscribe(
          data => 
          {
            this.authService.userSource.next(null)
            this.userService.addressSource.next(null)
            this.userService.cartSource.next([])
            this.userService.orderSource.next(null)
            this.router.navigate(['/'])
          }
        )
  }

}
