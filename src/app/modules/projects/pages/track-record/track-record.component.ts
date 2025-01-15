import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../../services/projects.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { MetaService } from 'src/app/core/services/meta.service';

@Component({
  selector: 'app-track-record',
  templateUrl: './track-record.component.html',
  styleUrls: ['./track-record.component.scss']
})
export class TrackRecordComponent implements OnInit, OnDestroy {

  trackRecordData: any = {};
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.Projects'),
      link: '/projects',
      queryParams: { type: "mega-projects", lang: environment.lang }
    },
    {
      name: this.translateService.instant('Projects.TrackRecord'),
      link: ''
    }
  ];
  loading = false;
  websiteUrl = environment.websiteUrl;
  subscriptions = new Subscription();

  constructor(
    private projectsService: ProjectsService,
    private translateService: TranslateService,
    private meta: Meta,
    private metaService: MetaService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getTrackRecordData();
  }

  getTrackRecordData(): void {
    this.loading = true;
    this.subscriptions.add(
      this.projectsService.getProjectsByType(
        'recent-projects',
        10000
      ).subscribe({
        next: (res: any) => {
          if (res?.status == 200) {
            this.trackRecordData = res?.data?.data
          }
          this.loading = false
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
