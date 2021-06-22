import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { WriteNewArticleComponent } from './pages/new/new.component';
import { PublisherPublicPageComponent } from './publisher-public-page.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "new", component: WriteNewArticleComponent },
      { path: "", component: PublisherPublicPageComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PublisherPublicPageRoutingModule
{}
