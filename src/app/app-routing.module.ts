import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { BundleDetailsComponent } from './bundle/details/details.component';
import { AddPublisherComponent } from './bundle/publishers/add/add.component';
import { BundlePublishersComponent } from './bundle/publishers/publishers.component';
import { SubscribeComponent } from './bundle/subscribe/subscribe.component';
import { ExploreComponent } from './explore/explore.component';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out/signed-out.guard';
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
import { AccountComponent } from './settings/account/account.component';
import { CreateOrganizationComponent } from './settings/organizations/create/create.component';
import { OrganizationsComponent } from './settings/organizations/organizations.component';
import { AddPaymentMethodComponent } from './settings/payment-methods/add/add.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { UserPublishersComponent } from './settings/publishers/publishers.component';
import { SecurityComponent } from './settings/security/security.component';
import { SubscriptionsComponent } from './settings/subscriptions/subscriptions.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: "signin", component: SigninComponent, canActivate: [ SignedOutGuard ] },
  { path: "signup", component: SignupComponent, canActivate: [ SignedOutGuard ] },
  {
    path: "settings",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "account", component: AccountComponent },
      { path: "security", component: SecurityComponent },
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
      { path: "", component: AccountComponent },
    ],
  },
  { path: "article/:id", component: ArticleComponent, canActivate: [ SignedInGuard ] },
  {
    path: "bundle/:id",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: BundleDetailsComponent },
      { path: "subscribe", component: SubscribeComponent },
      {
        path: "publishers",
        children: [
          { path: "add", component: AddPublisherComponent },
          { path: "", component: BundlePublishersComponent },
        ],
      },
      { path: "", component: BundleDetailsComponent },
    ],
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
