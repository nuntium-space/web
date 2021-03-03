import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out/signed-out.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: "signin", component: SigninComponent, canActivate: [ SignedOutGuard ] },
  { path: "signup", component: SignupComponent, canActivate: [ SignedOutGuard ] },
  { path: "feed", component: FeedComponent, canActivate: [ SignedInGuard ] },
  { path: "settings", component: SettingsComponent, canActivate: [ SignedInGuard ] },
  { path: "", component: HomeComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
