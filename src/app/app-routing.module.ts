import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: "draft/:id",
    loadChildren: () => import("./draft/draft.module").then(_ => _.DraftModule),
  },
  {
    path: "feed",
    loadChildren: () => import("./feeds/feeds.module").then(_ => _.FeedsModule),
  },
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
    loadChildren: () => import("./publisher-public-page/publisher-public-page.module").then(_ => _.PublisherPublicPageModule),
  },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(_ => _.HomeModule),
  },
  {
    path: "**",
    loadChildren: () => import("./page-not-found/page-not-found.module").then(_ => _.PageNotFoundModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule
{}
