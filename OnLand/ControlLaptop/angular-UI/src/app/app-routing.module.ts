import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SchematicsPageComponent } from './pages/schematics-page/schematics-page.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'schematics', component: SchematicsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
