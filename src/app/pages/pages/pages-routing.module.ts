import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForPublishersComponent } from './pages/for-publishers/for-publishers.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
  {
    path: 'for-publishers',
    component: ForPublishersComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
