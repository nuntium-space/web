import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { FeedsComponent } from './feeds.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { LikesComponent } from './pages/likes/likes.component';

const routes: Routes = [
  {
    path: "",
    component: FeedsComponent,
    canActivate: [ SignedInGuard ],
    children: [
      { path: "bookmarks", component: BookmarksComponent },
      { path: "explore", component: ExploreComponent },
      { path: "likes", component: LikesComponent },
      { path: "", component: FeedsComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FeedsRoutingModule
{}
