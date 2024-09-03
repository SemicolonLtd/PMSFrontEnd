import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreBusinessComponent } from './pages/core-business/core-business.component';

const routes: Routes = [
  {path: '', component: CoreBusinessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreBusinessRoutingModule { }
