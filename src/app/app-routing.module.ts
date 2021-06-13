import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
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
    matcher: (url) =>
    {
      if (url.length >= 1 && url[0].path.startsWith("~pub_"))
      {
        return {
          consumed: url.length === 1
            ? url
            : url.slice(0, 1),
          posParams: {
            id: new UrlSegment(url[0].path.substr(1), {}),
          },
        };
      }

      return null;
    },
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
