import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  langs: any[] | undefined;
  lang = environment.lang;
  isSticky = false
  navDetailsOpened: boolean = false;
  detailsType: string = '';
  sidebarMobileVisible: boolean = false;
  currentRoute!: string;

  constructor(
    private router: Router
  ) {}
  ngOnInit(): void {
    this.langs = [
      { name: 'En', code: 'en' },
      { name: 'Ar', code: 'ar' },
  ];

  this.checkCurrentRoute()
}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.isSticky = scrollPosition > 50
  }
  changeLang(lang:any): void {
    // this.lang = lang.code;

    // environment.lang = this.lang;
    // this.translateService.use(lang.value.code);
    // this.cookieService.set('lang', lang.value.code);
    // this.changeDir();
    // location.reload();
  }

  onSelectLink(type: any, directRoute: boolean): void {
    this.sidebarMobileVisible = false;

    if (directRoute) {
      this.router.navigate(['/' + type]);
      this.navDetailsOpened = false;
    } else {
      this.detailsType = type
      this.navDetailsOpened = true;
    }
  }

  onNavDetailsVisibilityChange(NavDetailsVisible: boolean): void {
    this.navDetailsOpened = NavDetailsVisible;
  }

  checkCurrentRoute(): void {
    this.router.events
    .pipe(
      filter(
        (event): event is NavigationEnd => event instanceof NavigationEnd
      )
    )
    .subscribe((event: NavigationEnd) => {
      console.log(event);
      
      this.currentRoute = event.url
    });
  }
}
