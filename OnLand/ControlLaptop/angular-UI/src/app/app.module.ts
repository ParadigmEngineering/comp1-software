import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PowerMetricsBarComponent } from './components/powermetrics-bar/powermetrics-bar.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';


import { NavigationButtonComponent } from './components/navigation-bar/navigation-button/navigation-button.component';
import { PowerMetricsButtonComponent } from './components/powermetrics-bar/powermetrics-button/powermetrics-button.component';
import { ControlButtonComponent } from './components/control-bar/control-button/control-button.component';
import { ConfigurationButtonComponent } from './components/configuration-bar/configuration-button/configuration-button.component';

import { LogoBarComponent } from './components/logo-bar/logo-bar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NavigationPageComponent } from './pages/navigation-page/navigation-page.component';
import { PowerMetricsPageComponent } from './pages/powermetrics-page/powermetrics-page.component';
import { ControlPageComponent } from './pages/control-page/control-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationButtonComponent,
    PowerMetricsButtonComponent,
    ControlButtonComponent,
    ConfigurationButtonComponent,
    LogoBarComponent,
    DashboardPageComponent,
    NavigationPageComponent,
    PowerMetricsPageComponent,
    ControlPageComponent,
    ConfigurationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
