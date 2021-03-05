import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out/signed-out.guard';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './organization/details/details.component';
import { CreatePublisherComponent } from './organization/publishers/create/create.component';
import { PublishersComponent } from './organization/publishers/publishers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountComponent } from './settings/account/account.component';
import { CreateOrganizationComponent } from './settings/organizations/create/create.component';
import { OrganizationsComponent } from './settings/organizations/organizations.component';
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
      { path: "", component: AccountComponent },
    ],
  },
  {
    path: "organization/:id",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: DetailsComponent },
      {
        path: "publishers",
        children: [
          { path: "create", component: CreatePublisherComponent },
          { path: "", component: PublishersComponent },
        ],
      },
      { path: "", component: DetailsComponent },
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
