import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationButtonComponent } from './components/navigation-bar/navigation-button/navigation-button.component';
import { SchematicIconComponent } from './components/schematic-icon/schematic-icon.component';
import { SchematicsComponent } from './components/schematics/schematics.component';
import { GojsAngularModule } from 'gojs-angular';
import { LogoBarComponent } from './components/logo-bar/logo-bar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NavigationPageComponent } from './pages/navigation-page/navigation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationButtonComponent,
    SchematicIconComponent,
    SchematicsComponent,
    LogoBarComponent,
    DashboardPageComponent,
    NavigationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GojsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
