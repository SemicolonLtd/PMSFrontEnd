import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetsComponent } from './pages/fleets/fleets.component';
import { FleetDetailsComponent } from './pages/fleet-details/fleet-details.component';

const routes: Routes = [
  {path: 'category', component: FleetsComponent},
  {path:'details', component: FleetDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetsRoutingModule { }
