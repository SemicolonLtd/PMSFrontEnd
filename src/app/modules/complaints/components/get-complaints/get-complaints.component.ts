import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var bootstrap: any;

@Component({
  selector: 'app-get-complaints',
  templateUrl: './get-complaints.component.html',
  styleUrls: ['./get-complaints.component.scss']
})
export class GetComplaintsComponent {
  @Input({ required: true }) complaintData: any;

  selectedFile: SafeResourceUrl | string = '';

  constructor(private sanitizer: DomSanitizer) {}

  openFileModal(fileUrl: string) {
    if (this.isImage(fileUrl)) {
      this.selectedFile = fileUrl;
    } else {
      this.selectedFile = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    }
    const modal = new bootstrap.Modal(document.getElementById('fileModal')!);
    modal.show();
  }

  isImage(url: any): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }

  getRowsCount(message: string): number {
    if (!message) return 1;
    const lines = message.split(/\r\n|\n/);
    return Math.max(lines.length, 3);
  }
}
