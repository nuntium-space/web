import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { OrganizationBundlesComponent } from './organization/bundles/bundles.component';
import { CreateBundleComponent } from './organization/bundles/create/create.component';
import { OrganizationDetailsComponent } from './organization/details/details.component';
import { CreatePublisherComponent } from './organization/publishers/create/create.component';
import { PublishersComponent } from './organization/publishers/publishers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WriteNewArticleComponent } from './publisher-public-page/new/new.component';
import { PublisherPublicPageComponent } from './publisher-public-page/publisher-public-page.component';
import { AuthorsComponent } from './publisher/authors/authors.component';
import { InviteAuthorComponent } from './publisher/authors/invite/invite.component';
import { PublisherDetailsComponent } from './publisher/details/details.component';
import { VerifyPublisherComponent } from './publisher/verify/verify.component';
import { AdvancedComponent } from './settings/advanced/advanced.component';
import { AccountDetailsComponent } from './settings/details/details.component';
import { CreateOrganizationComponent } from './settings/organizations/create/create.component';
import { OrganizationsComponent } from './settings/organizations/organizations.component';
import { AddPaymentMethodComponent } from './settings/payment-methods/add/add.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { UserPublishersComponent } from './settings/publishers/publishers.component';
import { SecurityComponent } from './settings/security/security.component';
import { SubscriptionsComponent } from './settings/subscriptions/subscriptions.component';
import { SignedInGuard } from './shared/guards/signed-in/signed-in.guard';
import { SignedOutGuard } from './shared/guards/signed-out/signed-out.guard';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: "signin", component: SigninComponent, canActivate: [ SignedOutGuard ] },
  {
    path: "settings",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: AccountDetailsComponent },
      { path: "security", component: SecurityComponent },
      { path: "preferences", component: PreferencesComponent },
      { path: "advanced", component: AdvancedComponent },
      {
        path: "organizations",
        children: [
          { path: "create", component: CreateOrganizationComponent },
          { path: "", component: OrganizationsComponent },
        ],
      },
      { path: "subscriptions", component: SubscriptionsComponent },
      {
        path: "payment-methods",
        children: [
          { path: "add", component: AddPaymentMethodComponent },
          { path: "", component: PaymentMethodsComponent },
        ],
      },
      { path: "publishers", component: UserPublishersComponent },
      { path: "", component: AccountDetailsComponent },
    ],
  },
  {
    path: "article/:id",
    loadChildren: () => import("./article/article.module").then(_ => _.ArticleModule),
  },
  {
    path: "bundle/:id",
    canActivate: [ SignedInGuard ],
    loadChildren: () => import("./bundle/bundle.module").then(_ => _.BundleModule),
  },
  { path: "explore", component: ExploreComponent, canActivate: [ SignedInGuard ] },
  {
    path: "organization/:id",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: OrganizationDetailsComponent },
      {
        path: "publishers",
        children: [
          { path: "create", component: CreatePublisherComponent },
          { path: "", component: PublishersComponent },
        ],
      },
      {
        path: "bundles",
        children: [
          { path: "create", component: CreateBundleComponent },
          { path: "", component: OrganizationBundlesComponent },
        ],
      },
      { path: "", component: OrganizationDetailsComponent },
    ],
  },
  {
    path: "publisher/:id",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: PublisherDetailsComponent },
      {
        path: "authors",
        children: [
          { path: "invite", component: InviteAuthorComponent },
          { path: "", component: AuthorsComponent },
        ],
      },
      { path: "verify", component: VerifyPublisherComponent },
      { path: "", component: PublisherDetailsComponent },
    ],
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
