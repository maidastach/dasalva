import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faBars, faCartPlus, faHome, faIdCard, faPizzaSlice, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Interfaces/User';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
  user!: User | null;
  cartLength!: number;
  faBars = faBars;
  faHome = faHome;
  faPizzaSlice = faPizzaSlice;
  faQuestionCircle = faQuestionCircle;
  faIdCard = faIdCard;
  faUser = faUser;
  faCartPlus = faCartPlus;
  innerWidth!: number;
  hasScrolled!: boolean;

  constructor(private authService: AuthService, private userService: UserService) { }

  @HostListener('window:resize', ['$event'])
  onResize() 
  {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) 
  {
    this.navBarSticker()    
  }

  @ViewChild('header') header!: ElementRef;

  ngOnInit(): void 
  {
    this.innerWidth = window.innerWidth;
    this.authService.user.subscribe(user => this.user = user)
    this.userService.cart.subscribe(cart => this.cartLength = cart.reduce((a, c) => a + c.quantity, 0))
  }

  navBarSticker()
  {
    //let header = document.querySelector('.header-content');
    let navbar = document.querySelector('.navbar');
    let app = document.querySelector('.app-container');
    let navbarCollapse = document.querySelector('.navbar-content') as HTMLDivElement;
    let headerLogo = document.querySelector('.header-img-logo');
    let home = document.querySelector('.home');
    let toggler = document.querySelector('.navbar-toggler-img') as HTMLImageElement;
    let sticky = this.header.nativeElement.offsetTop;

    if (window.pageYOffset > (sticky))
    {
      this.hasScrolled = true;
      home?.classList.add('home-sticky');
      this.header.nativeElement.classList.add('sticky');
      app?.classList.add('app-container-sticky');
      navbar?.classList.add('navbar-sticky');
      if(navbarCollapse) navbarCollapse.style.transform = 'translateY(1.4vw)';
      headerLogo?.classList.add('header-img-logo-sticky');
      if(toggler) toggler.src="/assets/image/written.png";
    }
    else
    {
      this.hasScrolled = false
      this.header.nativeElement.classList.remove('sticky');
      navbar?.classList.remove('navbar-sticky');
      app?.classList.remove('app-container-sticky');
      if(navbarCollapse) navbarCollapse.style.transform = 'translateY(0)';
      headerLogo?.classList.remove('header-img-logo-sticky');
      home?.classList.remove('home-sticky');
      if(toggler) toggler.src="/assets/image/writtenred.png";
    }
  };

}
