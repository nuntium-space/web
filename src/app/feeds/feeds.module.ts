import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './feeds-routing.module';
import { LikesComponent } from './pages/likes/likes.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { FeedsComponent } from './feeds.component';


@NgModule({
  declarations: [
    LikesComponent,
    BookmarksComponent,
    FeedsComponent
  ],
  imports: [
    CommonModule,
    FeedsRoutingModule
  ]
})
export class FeedsModule { }
