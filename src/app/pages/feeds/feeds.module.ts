import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { LikesComponent } from './pages/likes/likes.component';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { SearchComponent } from './pages/search/search.component';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    FeedsComponent,
    BookmarksComponent,
    ExploreComponent,
    LikesComponent,
    MenuComponent,
    HomeComponent,
    HistoryComponent,
    SearchComponent,
  ],
  imports: [CommonModule, SharedModule, FeedsRoutingModule],
  providers: [ApiService],
})
export class FeedsModule {}
