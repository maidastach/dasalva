import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { emailValidator, passwordValidator, signinPasswordValidator } from '../../auth-validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit 
{
  signInForm!: FormGroup;
  loading!: boolean;
  invalid!: boolean;
  @ViewChild("email") emailField!: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loadingService: LoadingService) { }

  ngAfterViewInit()
  {
    this.emailField.nativeElement.focus();
  }

  ngOnInit(): void
  {
    this.signInForm = this.fb.group(
      {
        email: ['', [emailValidator, Validators.required]],
        password: ['', [Validators.required]],
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
              if(error.includes('Password'))
              {
                this.signInForm.controls['password'].patchValue('')
                this.invalid = true
              }
              else
                this.signInForm.reset()
            }
          }
        )
  }

  signIn(): void
  {
    this.loading = true
    
    if(!signinPasswordValidator(this.signInForm.value.password))
    {
      this.invalid = true
      this.loadingService
        .errorMsgSource
          .next('Invalid Password')
      this.signInForm.controls['password'].reset()
    }
    else
    {
      this.invalid = false;
      this.authService
        .signIn(this.signInForm.value)
          .subscribe(
            user => 
            {
              this.loading = false
              this.authService.userSource.next(user)
              this.router.navigate(['/user/place-order']) //should go to selectshipping
              this.signInForm.reset()
            }
          )
    }
    
  }

}
