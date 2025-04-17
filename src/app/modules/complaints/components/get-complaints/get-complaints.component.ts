import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-get-complaints',
  templateUrl: './get-complaints.component.html',
  styleUrls: ['./get-complaints.component.scss']
})
export class GetComplaintsComponent {
  @Input({required:true}) complaintData:any;

  downloadFile():void 
  {
    // download file
  }

}
