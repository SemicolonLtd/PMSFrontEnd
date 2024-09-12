import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [MessageService]
})
export class ContactUsComponent implements OnInit, OnDestroy {

  mapUrl!:SafeResourceUrl;
  barTitle = this.translateService.instant('Contact.ContactUs')
  contactForm!: FormGroup;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private sanitizer:DomSanitizer,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.mapUrl = this.getGoogleMapsUrl();
    this.initContactForm();
  }

  getGoogleMapsUrl(): SafeResourceUrl {
    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=51.51552,-0.171683&t=k&z=14&ie=UTF8&iwloc=B&output=embed`;
    // const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${this.hotelLocation.lat},${this.hotelLocation.lon}&t=m&z=14&ie=UTF8&iwloc=B&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }

  initContactForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      email: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if(this.contactForm?.invalid) return;
    this.loading = true;
    const formData = new FormData();
    Object.keys(this.contactForm.value).forEach((key) => {
      formData.append(key, this.contactForm.value[key]);
    });
    this.subscriptions.add(
      this.contactService.sendContactRequest(formData).subscribe({
        next: () => {
          this.loading = false;
          this.contactForm.reset();
          this.messageService.add({ severity: 'success', summary: this.translateService.instant('Contact.Success'), detail: this.translateService.instant('Contact.SuccessMessage') });
        },
        error: (err: any) => {
          this.loading = false;
         
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
