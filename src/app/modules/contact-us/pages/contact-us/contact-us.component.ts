import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [MessageService]
})
export class ContactUsComponent {
  mapUrl!:SafeResourceUrl;
  barTitle = this.translateService.instant('Contact.ContactUs')
  loading: boolean = false
  constructor(
    private sanitizer:DomSanitizer,
    private translateService: TranslateService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.mapUrl = this.getGoogleMapsUrl()
  }

  getGoogleMapsUrl(): SafeResourceUrl {
    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=51.51552,-0.171683&t=k&z=14&ie=UTF8&iwloc=B&output=embed`;
    // const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${this.hotelLocation.lat},${this.hotelLocation.lon}&t=m&z=14&ie=UTF8&iwloc=B&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }

  submitContactUs(): void {
    this.loading = true;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
