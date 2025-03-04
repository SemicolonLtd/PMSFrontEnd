import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreBusinessCategoryComponent } from './pages/core-business-category/core-business-category.component';
import { CoreBusinessDetailsComponent } from './pages/core-business-details/core-business-details.component';
import { CoreBusinessComponent } from './pages/core-business/core-business.component';

const routes: Routes = [
  {path: '', component: CoreBusinessComponent},
  {path: ':slug', component: CoreBusinessComponent},
  {path: 'details/:slug', component: CoreBusinessDetailsComponent},
  {path: 'category/:slug', component: CoreBusinessCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreBusinessRoutingModule { }
