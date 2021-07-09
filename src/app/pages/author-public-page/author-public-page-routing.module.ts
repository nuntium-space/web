import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from 'src/app/shared/guards/signed-in/signed-in.guard';
import { AuthorPublicPageComponent } from './author-public-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [SignedInGuard],
    component: AuthorPublicPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorPublicPageRoutingModule { }
