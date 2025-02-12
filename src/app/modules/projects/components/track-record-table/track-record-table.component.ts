import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-record-table',
  templateUrl: './track-record-table.component.html',
  styleUrls: ['./track-record-table.component.scss']
})
export class TrackRecordTableComponent implements OnInit {

  @Input() trackRecordData: any;

  years: string[] = [];
  data: any[] = [];

  ngOnInit(): void {
    this.years = Object.keys(this.trackRecordData).reverse();
    console.log(this.years);
    this.data = Object.values(this.trackRecordData).reverse();
    console.log(this.data);
    
  }

}
