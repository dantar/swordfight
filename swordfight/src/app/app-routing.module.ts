import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuelButtonsComponent } from './components/main/duel-buttons/duel-buttons.component';


const routes: Routes = [
  {path: '', component: DuelButtonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
