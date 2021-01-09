import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeToggleComponent } from './components/buttons/theme-toggle/theme-toggle.component';
import { FullscreenToggleComponent } from './components/buttons/fullscreen-toggle/fullscreen-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeToggleComponent,
    FullscreenToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
