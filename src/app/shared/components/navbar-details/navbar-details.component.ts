import { Component, EventEmitter, Input, Output, Renderer2, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from './../../../core/services/navbar.service';

@Component({
  selector: 'app-navbar-details',
  templateUrl: './navbar-details.component.html',
  styleUrls: ['./navbar-details.component.scss']
})
export class NavbarDetailsComponent {
  @Input() sidebarVisible: boolean = false;
  @Input() detailsType!: string;
  @Output() sidebarVisibilityChange = new EventEmitter<boolean>();
  subscriptions = new Subscription()
  loading: boolean = true;
  linksList: any[] = []

  constructor(
    private renderer: Renderer2,
    private navbarService: NavbarService
    ) {}

  ngOnInit(): void {
    this.getNavLinkDetails()
  }

  ngOnChanges(changes: SimpleChange): void {
    this.preventScrollXPage();
  }

  preventScrollXPage(): void {
    if (this.sidebarVisible) {
      this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
      this.renderer.setStyle(document.body, 'height', '100vh');
    } else {
    this.renderer.removeStyle(document.body, 'overflow-y');
    this.renderer.removeStyle(document.body, 'height' );
    }
  }

  onSidebarHide(): void {
    this.sidebarVisible = false;
    this.sidebarVisibilityChange.emit(this.sidebarVisible);
  }

  getNavLinkDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.navbarService.getNavLinkDetails(this.detailsType).subscribe(
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
