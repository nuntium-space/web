import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../../shared/guards/signed-in/signed-in.guard';
import { ArticleComponent } from './article.component';
import { ReportComponent } from './pages/report/report.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [SignedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
