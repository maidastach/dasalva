import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interfaces/User';
import { emailValidator, telephoneValidator } from 'src/app/Modules/Auth/auth-validators';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoadingService } from 'src/app/Services/Loading/loading.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit
{
  contactForm!: FormGroup;
  loading!: boolean;
  @ViewChild('name') name!: ElementRef;

  constructor(private fb: FormBuilder, private userService: UserService, private loadingService: LoadingService, private authService: AuthService) { }

  ngAfterViewInit(): void 
  {
    this.name.nativeElement.focus()
  }

  ngOnInit(): void
  {
    const user: User | null = this.authService.userSource.value;

    this.contactForm = this.fb.group(
      {
        name: [user?.fname || '', [Validators.minLength(3), Validators.required]],
        email: [user?.email || '', [emailValidator, Validators.required]],
        telephone: [user?.telephone || '', [telephoneValidator, Validators.minLength(8), Validators.maxLength(12), Validators.required]],
        city: ['', [Validators.minLength(2), Validators.required]],
        message: ['', [Validators.minLength(10), Validators.required]]
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

  sendContactForm(): void
  {
    this.loading = true;
    this.userService
      .sendContactForm(this.contactForm.value)
        .subscribe(
          data =>
          {
            this.loading = false
            this.contactForm.reset()
          }
        )
  }

}
