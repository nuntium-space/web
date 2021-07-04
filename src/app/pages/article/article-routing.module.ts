import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../../shared/guards/signed-in/signed-in.guard';
import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    canActivate: [SignedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
