import { Component } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  certificatesList = [
    {
      title: 'Certificate 1',
      img: 'assets/images/global/certificate-ex.webp'
    },
    {
      title: 'Certificate 2',
      img: 'assets/images/global/certificate-ex.webp'
    },
    {
      title: 'Certificate 3',
      img: 'assets/images/global/certificate-ex.webp'
    },
    {
      title: 'Certificate 4',
      img: 'assets/images/global/certificate-ex.webp'
    },
  ]
}
