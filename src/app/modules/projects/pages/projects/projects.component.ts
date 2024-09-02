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

  projectsList: any[] = [
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    }
  ]

  value: string = 'completed-projects';

  onSelectCategory(category: any): void {
    console.log(category.value);
    
  }
}
