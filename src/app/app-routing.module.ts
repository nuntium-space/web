import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out/signed-out.guard';
import { HomeComponent } from './home/home.component';
import { OrganizationDetailsComponent } from './organization/details/details.component';
import { CreatePublisherComponent } from './organization/publishers/create/create.component';
import { PublishersComponent } from './organization/publishers/publishers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublisherPublicPageComponent } from './publisher-public-page/publisher-public-page.component';
import { AuthorsComponent } from './publisher/authors/authors.component';
import { InviteAuthorComponent } from './publisher/authors/invite/invite.component';
import { PublisherDetailsComponent } from './publisher/details/details.component';
import { AccountComponent } from './settings/account/account.component';
import { CreateOrganizationComponent } from './settings/organizations/create/create.component';
import { OrganizationsComponent } from './settings/organizations/organizations.component';
import { UserPublishersComponent } from './settings/publishers/publishers.component';
import { SecurityComponent } from './settings/security/security.component';
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
      { path: "publishers", component: UserPublishersComponent },
      { path: "", component: AccountComponent },
    ],
  },
  { path: "article/:id", component: ArticleComponent, canActivate: [ SignedInGuard ] },
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
      return url.length === 1 && url[0].path.startsWith("~")
        ? ({consumed: url})
        : null;
    },
    component: PublisherPublicPageComponent,
    canActivate: [ SignedInGuard ],
  },
  { path: "", component: HomeComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
