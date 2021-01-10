import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeToggleComponent } from './components/buttons/theme-toggle/theme-toggle.component';
import { FullscreenToggleComponent } from './components/buttons/fullscreen-toggle/fullscreen-toggle.component';
import { BoxedSwordComponent } from './components/button/boxed-sword/boxed-sword.component';
import { DuelButtonsComponent } from './components/main/duel-buttons/duel-buttons.component';
import { LandingPageComponent } from './components/main/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeToggleComponent,
    FullscreenToggleComponent,
    BoxedSwordComponent,
    DuelButtonsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
