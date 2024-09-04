import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  eventsList: any[] = [
    {
      id:1,
      image: 'assets/images/home/event-1.jpg',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/event-2.jpg',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/event-1.jpg',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/event-2.jpg',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      date: '20/8/2023',
    }
  ]

  value: string = 'completed-projects';

  onSelectCategory(category: any): void {
    console.log(category.value);
    
  }
}
