import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TendersComponent } from './pages/tenders/tenders.component';
import { TenderDetailsComponent } from './pages/tender-details/tender-details.component';

const routes: Routes = [
  {path: '', component: TendersComponent},
  {path:'details/:slug', component: TenderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TendersRoutingModule { }
