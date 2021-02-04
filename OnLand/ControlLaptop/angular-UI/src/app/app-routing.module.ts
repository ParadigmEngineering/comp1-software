import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NavigationPageComponent } from './pages/navigation-page/navigation-page.component';
import { PowerMetricsPageComponent } from './pages/navigation-page/powermetrics-page.component';
import { ControlPageComponent } from './pages/navigation-page/control-page.component';
import { ConfigurationPageComponent } from './pages/navigation-page/configuration-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard-page', pathMatch: 'full' }, // set dashboard as the home page
  { path: 'dashboard-page', component: DashboardPageComponent },
  { path: 'navigation-page', component: NavigationPageComponent },
  { path: 'powermetrics-page', component: PowerMetricsPageComponent },
  { path: 'control-page', component: ControlPageComponent },
  { path: 'configuration-page', component: ConfigurationPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
