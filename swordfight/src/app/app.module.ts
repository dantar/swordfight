import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeToggleComponent } from './components/buttons/theme-toggle/theme-toggle.component';
import { FullscreenToggleComponent } from './components/buttons/fullscreen-toggle/fullscreen-toggle.component';
import { BoxedSwordComponent } from './components/button/boxed-sword/boxed-sword.component';
import { DuelButtonsComponent } from './components/main/duel-buttons/duel-buttons.component';
import { LandingPageComponent } from './components/main/landing-page/landing-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BroadswordComponent } from './components/swords/broadsword/broadsword.component';
import { StrikeFatalComponent } from './components/parts/strike-fatal/strike-fatal.component';
import { EnemyOrcComponent } from './components/enemies/enemy-orc/enemy-orc.component';
import { IconLockedComponent } from './components/buttons/icon-locked/icon-locked.component';
import { IconOrcComponent } from './components/buttons/icon-orc/icon-orc.component';
import { FightDebriefComponent } from './components/main/fight-debrief/fight-debrief.component';
import { GameOptionsComponent } from './components/main/game-options/game-options.component';
import { StatsLifeComponent } from './components/buttons/stats-life/stats-life.component';
import { OptionsCogComponent } from './components/buttons/options-cog/options-cog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WorldMapComponent } from './components/main/world-map/world-map.component';
import { FullpageMenuComponent } from './components/main/fullpage-menu/fullpage-menu.component';
import { OrcTrainingComponent } from './components/main/orc-training/orc-training.component';
import { MenuToggleComponent } from './components/buttons/menu-toggle/menu-toggle.component';

import * as Hammer from 'hammerjs';
import { FeatureShrineComponent } from './components/world/feature-shrine/feature-shrine.component';
import { FeaturePlaceholderComponent } from './components/world/feature-placeholder/feature-placeholder.component';
import { FeatureTreeComponent } from './components/world/feature-tree/feature-tree.component';
import { FeatureStoneComponent } from './components/world/feature-stone/feature-stone.component';
import { PixieComponent } from './components/world/pixie/pixie.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
    pinch: { enabled: true },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ThemeToggleComponent,
    FullscreenToggleComponent,
    BoxedSwordComponent,
    DuelButtonsComponent,
    LandingPageComponent,
    BroadswordComponent,
    StrikeFatalComponent,
    EnemyOrcComponent,
    IconLockedComponent,
    IconOrcComponent,
    FightDebriefComponent,
    GameOptionsComponent,
    StatsLifeComponent,
    OptionsCogComponent,
    WorldMapComponent,
    FullpageMenuComponent,
    OrcTrainingComponent,
    MenuToggleComponent,
    FeatureShrineComponent,
    FeaturePlaceholderComponent,
    FeatureTreeComponent,
    FeatureStoneComponent,
    PixieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HammerModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
