import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MetaService } from 'src/app/core/services/meta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    private translateService: TranslateService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.handleMetaTags();
  }

  handleMetaTags(): void {
    const content: any = {
      title:  'General.OrgName',
      useTranslation: true,
      description: 'PMS Website',
      keywords: 'PMS Website',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}`
    };
    this.metaService.createMetaData(content);
  }

}
