import { Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-details',
  templateUrl: './navbar-details.component.html',
  styleUrls: ['./navbar-details.component.scss']
})
export class NavbarDetailsComponent implements OnChanges {
  @Input() sidebarVisible: boolean = false;
  @Input() displayedLinks: any[] = [];
  @Input() detailsType: string = '';
  @Input() detailsTitle: string = '';
  @Output() sidebarVisibilityChange = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedLinks = changes['displayedLinks']?.currentValue ? changes['displayedLinks']?.currentValue : this.displayedLinks;
    this.detailsType = changes['detailsType']?.currentValue ? changes['detailsType']?.currentValue : this.detailsType;
    this.preventScrollXPage();
  }

  preventScrollXPage(): void {
    if (this.sidebarVisible) {
      this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
      this.renderer.setStyle(document.body, 'height', '100vh');
    } else {
      this.renderer.removeStyle(document.body, 'overflow-y');
      this.renderer.removeStyle(document.body, 'height');
    }
  }

  onSidebarHide(): void {
    this.sidebarVisible = false;
    this.sidebarVisibilityChange.emit(this.sidebarVisible);
  }

  openLink(link: any): void {
    this.onSidebarHide();
    if(link?.slug) {
      this.router.navigateByUrl('/content?slug=' + link.slug);
    } else if(link?.link) {
      this.router.navigateByUrl(link.link);
    }
  }

}
