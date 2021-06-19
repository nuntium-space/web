import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WriteNewArticleComponent } from './publisher-public-page/new/new.component';
import { PublisherPublicPageComponent } from './publisher-public-page/publisher-public-page.component';
import { SignedInGuard } from './shared/guards/signed-in/signed-in.guard';

const routes: Routes = [
  {
    path: "signin",
    loadChildren: () => import("./sign-in/sign-in.module").then(_ => _.SignInModule),
  },
  {
    path: "settings",
    loadChildren: () => import("./settings/settings.module").then(_ => _.SettingsModule),
  },
  {
    path: "article/:id",
    loadChildren: () => import("./article/article.module").then(_ => _.ArticleModule),
  },
  {
    path: "bundle/:id",
    loadChildren: () => import("./bundle/bundle.module").then(_ => _.BundleModule),
  },
  { path: "explore", component: ExploreComponent, canActivate: [ SignedInGuard ] },
  {
    path: "organization/:id",
    loadChildren: () => import("./organization/organization.module").then(_ => _.OrganizationModule),
  },
  {
    path: "publisher/:id",
    loadChildren: () => import("./publisher/publisher.module").then(_ => _.PublisherModule),
  },
  {
    path: "p/:id",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "new", component: WriteNewArticleComponent },
      { path: "", component: PublisherPublicPageComponent },
    ],
  },
  { path: "", component: HomeComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
