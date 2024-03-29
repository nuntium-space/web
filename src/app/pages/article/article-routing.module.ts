import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../../shared/guards/signed-in/signed-in.guard';
import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    canActivate: [SignedInGuard],
    children: [
      { path: 'content', data: { section: 'content' } },
      { path: 'report', data: { section: 'report' } },
      { path: 'stats', data: { section: 'stats' } },
      { path: '', redirectTo: 'content' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
