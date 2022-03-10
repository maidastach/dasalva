import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { emailValidator, passwordValidator, telephoneValidator } from '../../auth-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit
{
  registerForm!: FormGroup;
  loading!: boolean;
  @ViewChild('fname') fname!: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loadingService: LoadingService) { }

  ngAfterViewInit(): void 
  {
    this.fname.nativeElement.focus()
  }

  ngOnInit(): void
  {
    this.registerForm = this.fb.group(
      {
        fname: ['', [Validators.minLength(3), Validators.required]],
        lname: ['', [Validators.minLength(3), Validators.required]],
        email: ['', [emailValidator, Validators.required]],
        telephone: ['', [telephoneValidator, Validators.minLength(8), Validators.maxLength(12), Validators.required]],
        password: ['', [passwordValidator, Validators.required]],
        repassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
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
              this.registerForm.controls['password'].reset()
              this.registerForm.controls['repassword'].reset()
              if(error.includes('registered'))
                this.registerForm.controls['email'].patchValue('')
            }
          }
        )
  }

  register(): void
  {
    this.loading = true;
    if(this.registerForm.value.password === this.registerForm.value.repassword)
    {
      this.authService
        .registerUser(this.registerForm.value)
          .subscribe(
            data => 
            {
              this.loading = false;
              this.registerForm.reset()
              this.router.navigate(['/auth/signin'])
            }
          )
    }
    else
    {
      this.loading = false;
      this.registerForm
        .controls['repassword']
          .setErrors(
            { 'notMatching': { valid: false } }
          )
      this.loadingService
        .errorMsgSource
          .next('Passwords do not match')
    }
            

  }

}
