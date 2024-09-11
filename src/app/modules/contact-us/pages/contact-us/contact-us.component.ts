import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  mapUrl!:SafeResourceUrl;
  barTitle = this.translateService.instant('Contact.ContactUs')

  constructor(
    private sanitizer:DomSanitizer,
    private translateService: TranslateService
  ){}

  ngOnInit(): void {
    this.mapUrl = this.getGoogleMapsUrl()
  }

  getGoogleMapsUrl(): SafeResourceUrl {
    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=51.51552,-0.171683&t=k&z=14&ie=UTF8&iwloc=B&output=embed`;
    // const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${this.hotelLocation.lat},${this.hotelLocation.lon}&t=m&z=14&ie=UTF8&iwloc=B&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }
}
