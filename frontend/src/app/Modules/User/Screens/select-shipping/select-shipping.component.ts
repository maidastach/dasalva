import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Shipping } from 'src/app/Interfaces/User';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { pickUpAddress, UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-select-shipping',
  templateUrl: './select-shipping.component.html',
  styleUrls: ['./select-shipping.component.scss']
})

export class SelectShippingComponent implements OnInit 
{
  shipping!: Shipping[];
  selected!: Shipping['_id'];
  validateButton!: boolean;

  constructor(private location: Location, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.authService 
      .userSource
        .subscribe(
          user =>
          {
            if(user)
              this.shipping = user.shipping
          }
        )
  }

  editShipping(id: string): void
  {
    this.userService.isEditingShippingSource.next(true)
    if(!this.userService.addressSource.value)
    {
      const currentAddress: Shipping = this.shipping.filter(address => address._id === id)[0]
      this.userService.addressSource.next(currentAddress)
    }
    this.router.navigate([`/user/shipping/${id}`])
  }

  deleteShipping(id: string): void
  {
    if(confirm('Are you sure to delete this address?'))
      this.userService
        .deleteShippingAddress(id)
          .subscribe(
            user => 
            {
              this.authService.userSource.next(user)
              if(this.userService.addressSource.value?._id === id)
                this.userService.addressSource.next(null)
            }
          )
  }


  selectShipping(event: any): void
  {
    event.preventDefault();
    
    if(!this.selected)
      this.userService
        .isAddingAddress()
          .subscribe(
            user => 
            {
              this.userService.addressSource.next(null)
              this.authService.userSource.next(user)
              this.router.navigate(['/user/shipping'])
            }
          )
    else if(this.selected === 'pickUp')
    {
      this.userService
      .isPickingUp()
        .subscribe(
          user => 
          {
            this.authService.userSource.next(user)
            this.userService.addressSource.next(pickUpAddress)
            this.router.navigate(['/user/place-order'])
          }
        )
    }
    else
    {
      if(this.selected === this.userService.addressSource.value?._id)
        this.router.navigate(['/user/place-order'])
      else
      {
        this.userService
          .selectShippingAddress(this.selected)
            .subscribe(
              user =>
              {
                this.authService.userSource.next(user)
                const selected = this.authService.userSource.value?.shipping.filter(address => address.isSelected)[0] || null
                this.userService.addressSource.next(selected)
                this.router.navigate(['/user/place-order'])
              }
            )
      }
      
    }
  }

  changer(event: NgModel)
  {
    this.selected = event.control.value
    this.validateButton = true;    
  }

  backButton(): void
  {
    this.location.back();
  }
}
