import { Component, Input } from '@angular/core';


declare var bootstrap: any;

@Component({
  selector: 'app-get-complaints',
  templateUrl: './get-complaints.component.html',
  styleUrls: ['./get-complaints.component.scss']
})
export class GetComplaintsComponent {
  @Input({required:true}) complaintData:any;

  selectedFile: string = '';

  openFileModal(fileUrl: string) {
    this.selectedFile = fileUrl;
    const modal = new bootstrap.Modal(document.getElementById('fileModal')!);
    modal.show();
  }
  
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }


  getRowsCount(message: string): number {
    if (!message) return 1;  
    const lines = message.split(/\r\n|\n/);
    return Math.max(lines.length, 3); 
  }

}
