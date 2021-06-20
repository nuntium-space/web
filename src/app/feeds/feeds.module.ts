import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { LikesComponent } from './pages/likes/likes.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    FeedsComponent,
    BookmarksComponent,
    ExploreComponent,
    LikesComponent,
    MenuComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedsRoutingModule,
  ],
})
export class FeedsModule
{}
