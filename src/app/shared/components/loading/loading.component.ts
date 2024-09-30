import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import {  AnimationOptions, LottieModule } from 'ngx-lottie';


@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() type!: string
  options: AnimationOptions = {
    // path: '/assets/animation-2.json',
    path: '/assets/animation-1.json',
  };
}
