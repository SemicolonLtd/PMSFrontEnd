import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {

  lang = environment.lang;

  transform(value: string | Date): string {
    if (!value) return '';

    // Convert value to Date object if it's not already
    const date = typeof value === 'string' ? new Date(value) : value;

    // Calculate time difference in milliseconds
    const diff = Date.now() - date.getTime();

    // Convert time difference from milliseconds to appropriate units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Determine the appropriate relative time string
    if (years > 1) {
      return this.lang === 'en' ? `${years} years ago` : `منذ ${years} سنوات`;
    } else if (years === 1) {
      return this.lang === 'en' ? '1 year ago' : 'منذ سنة';
    } else if (months > 1) {
      return this.lang === 'en' ? `${months} months ago` : `منذ ${months} أشهر`;
    } else if (months === 1) {
      return this.lang === 'en' ? '1 month ago' : 'منذ شهر';
    } else if (days > 1) {
      return  this.lang === 'en' ? `${days} days ago` :  `منذ ${days} يوم`;
    } else if (days === 1) {
      return this.lang === 'en' ? '1 day ago' : 'منذ يوم';
    } else if (hours > 0) {
      return this.lang === 'en' ? `${hours} hours ago` : `منذ ${hours} ساعات`;
    } else if (minutes > 0) {
      return this.lang === 'en' ? `${minutes} minutes ago` : `منذ ${minutes} دقائق`;
    } else {
      return this.lang === 'en' ? 'just now' : 'الآن';
    }
  }

}
