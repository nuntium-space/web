import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "admin/:id",
    loadChildren: () => import("./pages/admin/admin.module").then(_ => _.AdminModule),
  },
  {
    path: "article/:id",
    loadChildren: () => import("./pages/article/article.module").then(_ => _.ArticleModule),
  },
  {
    path: "bundle/:id",
    loadChildren: () => import("./pages/bundle/bundle.module").then(_ => _.BundleModule),
  },
  {
    path: "draft/:id",
    loadChildren: () => import("./pages/draft/draft.module").then(_ => _.DraftModule),
  },
  {
    path: "feed",
    loadChildren: () => import("./pages/feeds/feeds.module").then(_ => _.FeedsModule),
  },
  {
    path: "organization/:id",
    loadChildren: () => import("./pages/organization/organization.module").then(_ => _.OrganizationModule),
  },
  {
    path: "p/:id",
    loadChildren: () => import("./pages/publisher-public-page/publisher-public-page.module").then(_ => _.PublisherPublicPageModule),
  },
  {
    path: "publisher/:id",
    loadChildren: () => import("./pages/publisher/publisher.module").then(_ => _.PublisherModule),
  },
  {
    path: "settings",
    loadChildren: () => import("./pages/settings/settings.module").then(_ => _.SettingsModule),
  },
  {
    path: "signin",
    loadChildren: () => import("./pages/sign-in/sign-in.module").then(_ => _.SignInModule),
  },
  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then(_ => _.HomeModule),
  },
  {
    path: "**",
    loadChildren: () => import("./pages/page-not-found/page-not-found.module").then(_ => _.PageNotFoundModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule
{}
