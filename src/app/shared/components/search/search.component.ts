import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() Title!: string;
  @Output() searchEmitter = new EventEmitter();
  searchValue: any

  onSearch(): void {
    // if (this.searchValue?.trim()?.length) {
    this.searchEmitter.emit(this.searchValue);
    // }
  }

}
