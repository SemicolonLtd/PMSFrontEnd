import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-center-bar',
  templateUrl: './center-bar.component.html',
  styleUrls: ['./center-bar.component.scss']
})
export class CenterBarComponent {
  @Input() Title!:string;
  @Input() Desc!:string;
  @Input() htmlDesc:boolean = false;
}
