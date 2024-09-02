import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss']
})
export class RecentProjectsComponent {
  projectData:any[] = []


  ngOnInit(): void {
    this.projectData = [
      {
        id: 1,
        image: '../../../../../assets/images/home/project-1.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 1',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-2.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 2',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-3.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 3',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-2.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 4',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-4.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 5',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
    ]
  }

}
