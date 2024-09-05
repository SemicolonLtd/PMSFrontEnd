import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreBusinessDetailsComponent } from './pages/core-business-details/core-business-details.component';
import { CoreBusinessComponent } from './pages/core-business/core-business.component';

const routes: Routes = [
  {path: '', component: CoreBusinessComponent},
  {path: 'details/:slug', component: CoreBusinessDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreBusinessRoutingModule { }
