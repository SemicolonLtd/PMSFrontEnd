import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '../models/metaData.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private title:Title,
    private meta: Meta,
    private translateService: TranslateService
  ) { }


  createMetaData(content: MetaData): void {
    this.handleTitleTranslation(content)
  }

  handleTitleTranslation(content: MetaData): void {
    let title = ''
    if (content.useTranslation) {
      this.translateService.get(content.title).subscribe(
        (res) => {
          title = res;
          this.addMetaTags(content, title)
        }
      )
    } else {
      title = content.title
      this.addMetaTags(content, title)
    }
  }

  addMetaTags(content: MetaData, title: string) {
    this.title.setTitle(title);
    const metaTags = [
      { name: 'developed by', content: this.translateService.instant('Semicolon') },
      { name: 'author', content: this.translateService.instant('Semicolon') },
      { name: 'description', content: content.description },
      { name: 'keywords', content: content.keywords },
      { name: 'canonical', content: content.url },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: this.translateService.instant('Semicolon') },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: content.description },
      { name: 'twitter:image', content: content.image },

      // Facebook Card
      { name: 'og:url', content: content.url },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: title },
      { name: 'og:description', content: content.description },
      { name: 'og:image', content: content.image }
    ];
    this.submitMetaTags(metaTags)
  }

  submitMetaTags(metaTags: any[]): void {
    metaTags.forEach(
      tag => this.meta.addTag(tag)
    )
  }
}
