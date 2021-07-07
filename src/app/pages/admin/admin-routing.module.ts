import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from 'src/app/shared/guards/signed-in/signed-in.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [SignedInGuard],
    children: [
      { path: 'drafts', data: { section: 'drafts' } },
      { path: 'reports', data: { section: 'reports' } },
      { path: '', redirectTo: 'drafts' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
