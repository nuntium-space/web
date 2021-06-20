import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { FeedsComponent } from './feeds.component';

const routes: Routes = [
  {
    path: "",
    component: FeedsComponent,
    canActivate: [ SignedInGuard ],
    children: [
      { path: "bookmarks", data: { section: "bookmarks" } },
      { path: "explore", data: { section: "explore" } },
      { path: "history", data: { section: "history" } },
      { path: "home", data: { section: "home" } },
      { path: "likes", data: { section: "likes" } },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FeedsRoutingModule
{}
