import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailsComponent } from './pages/events-details/event-details.component';

const routes: Routes = [
  {path: '', component: EventsComponent},
  {path:'details/:id', component: EventDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
