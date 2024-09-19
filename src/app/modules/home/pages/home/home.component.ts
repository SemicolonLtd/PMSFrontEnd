import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  schema = {
    "@context": "http://www.schema.org",
    "@type": "Organization",
    "name": this.translateService.instant('General.OrgName'),
    "url": environment.websiteUrl,
    "logo": `${environment.websiteUrl}/assets/images/global/logo.svg`,
    "image": `${environment.websiteUrl}/assets/images/global/logo.svg`,
    "description": this.translateService.instant('General.OrgDesc'),
  }

    constructor(
      private translateService:TranslateService
    ){}
}
