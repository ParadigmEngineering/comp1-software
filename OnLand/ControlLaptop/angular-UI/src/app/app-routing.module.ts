import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NavigationPageComponent } from './pages/navigation-page/navigation-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard-page', pathMatch: 'full' }, // set dashboard as the home page
  { path: 'dashboard-page', component: DashboardPageComponent },
  { path: 'navigation-page', component: NavigationPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
