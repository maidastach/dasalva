import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { emailValidator, passwordValidator } from '../../auth-validators';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})

export class NewpasswordComponent implements OnInit, AfterViewInit
{
  form!: FormGroup;
  @ViewChild('email') email!: ElementRef
  loading!: boolean

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private loadingService: LoadingService
  ) { }

  ngAfterViewInit(): void
  {
    this.email.nativeElement.focus()
  }

  ngOnInit(): void 
  {
    this.form = this.fb.group(
      {
        email: ['', [emailValidator, Validators.required]],
        password: ['', [passwordValidator, Validators.required]],
        repassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
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
              this.form.controls['password'].reset()
              this.form.controls['repassword'].reset()
            }
          }
        )

  }

  updatePassword(): void
  {
    this.loading = true
    if(this.form.value.password === this.form.value.repassword)
    {
      const { repassword, ...form } = this.form.value;
      const { token } = this.route.snapshot.params

      this.authService
        .updatePassword({ ...form, token })
          .subscribe(
            user => 
            {
              this.loading = false
              this.authService.userSource.next(user);
              this.form.reset()
              this.router.navigate(['/user/profile'])
            }
          )
    }
    else
    {
      this.loading = false
      this.form
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
