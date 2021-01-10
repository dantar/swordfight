import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuelButtonsComponent } from './components/main/duel-buttons/duel-buttons.component';
import { LandingPageComponent } from './components/main/landing-page/landing-page.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
