import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationButtonComponent } from './components/navigation-bar/navigation-button/navigation-button.component';
import { SchematicsPageComponent } from './pages/schematics-page/schematics-page.component';
import { SchematicIconComponent } from './components/schematic-icon/schematic-icon.component';
import { SchematicsComponent } from './components/schematics/schematics.component';
import { GojsAngularModule } from 'gojs-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationBarComponent,
    NavigationButtonComponent,
    SchematicsPageComponent,
    SchematicIconComponent,
    SchematicsComponent
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
