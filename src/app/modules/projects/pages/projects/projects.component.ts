import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  stateOptions: any[] = [
    { label: 'Recent Projects', value: 'recent-projects' },
    { label: 'Completed Projects', value: 'completed-projects' },
    { label: 'Mega Projects', value: 'mega-projects' }
  ];

  value: string = 'completed-projects';

  onSelectCategory(category: any): void {
    console.log(category.value);
    
  }
}
