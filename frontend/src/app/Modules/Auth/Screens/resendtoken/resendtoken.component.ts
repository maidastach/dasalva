import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { emailValidator } from '../../auth-validators';

@Component({
  selector: 'app-resendtoken',
  templateUrl: './resendtoken.component.html',
  styleUrls: ['./resendtoken.component.scss']
})

export class ResendtokenComponent implements OnInit
{
  form!: FormGroup;
  loading!: boolean;
  errorMsg!: string;
  @ViewChild('email') email!: ElementRef;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private loadingService: LoadingService) { }

  ngAfterViewInit(): void
  { 
    this.email.nativeElement.focus()
  }

  ngOnInit(): void 
  {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, emailValidator]]
      }
    )

    this.loadingService
      .errorMsg
        .subscribe(
          error =>
          {
            if(error)
            {
              this.errorMsg = error
              this.form.controls['email'].patchValue('')
            }
          }
        )
    this.loadingService
      .loading
        .subscribe(
          loading => this.loading = loading
        )

  }

  resendToken(): void
  {
    const email = this.form.controls['email'].value
    this.authService
      .resendToken(email)
        .subscribe(
          email =>
          {
            this.form.reset()
            this.router.navigate(['/auth/signin'])          
          }
        )
  }

}