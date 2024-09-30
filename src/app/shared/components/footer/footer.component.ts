import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  settingsData: any;
  socialMediaData: any;
  subscriptions = new Subscription();

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSettings();
    this.getSocialMediaData();
  }

  openStaticPage(slug: string): void {
    this.router.navigateByUrl('/content?slug=' + slug);
  }

  getSettings(): void {
    this.subscriptions.add(
      this.settingsService.getAllSettings('setting').subscribe({
        next: (res: any) => {
          if (res?.status === 200) {
            this.settingsData = res?.data;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

  getSocialMediaData(): void {
    this.subscriptions.add(
      this.settingsService.getAllSettings('social').subscribe({
        next: (res: any) => {
          if (res?.status === 200) {
            this.socialMediaData = res?.data;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
