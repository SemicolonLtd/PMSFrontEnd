import { Component, EventEmitter, Input, Output, Renderer2, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from './../../../core/services/navbar.service';

@Component({
  selector: 'app-navbar-details',
  templateUrl: './navbar-details.component.html',
  styleUrls: ['./navbar-details.component.scss']
})
export class NavbarDetailsComponent {
  @Input() navDetailsVisible: boolean = false;
  @Input() detailsType!: string;
  @Output() navDetailsVisibilityChange = new EventEmitter<boolean>();
  subscriptions = new Subscription()
  loading: boolean = true;
  linksList: any[] = []

  constructor(
    private renderer: Renderer2,
    private navbarService: NavbarService
    ) {}

  ngOnInit(): void {
    this.getNavLinkDetails();
  }

  ngOnChanges(changes: SimpleChange): void {
    this.preventScrollXPage();
  }

  preventScrollXPage(): void {
    if (this.navDetailsVisible) {
      this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
      this.renderer.setStyle(document.body, 'height', '100vh');
    } else {
    this.renderer.removeStyle(document.body, 'overflow-y');
    this.renderer.removeStyle(document.body, 'height' );
    }
  }

  onHideNavDetails(): void {
    this.navDetailsVisible = false;
    this.navDetailsVisibilityChange.emit(this.navDetailsVisible);
  }

  getNavLinkDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.navbarService.getNavLinkDetails().subscribe(
        (res:any) => {
          if (res?.status === 200) {
            this.linksList = res?.data?.data;
          }
          this.loading = false
        } 
      )
    )
  }
}
