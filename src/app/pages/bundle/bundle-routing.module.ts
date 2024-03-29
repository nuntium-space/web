import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../../shared/guards/signed-in/signed-in.guard';
import { BundleComponent } from './bundle.component';

const routes: Routes = [
  {
    path: '',
    component: BundleComponent,
    canActivate: [SignedInGuard],
    children: [
      { path: 'details', data: { section: 'details' } },
      { path: 'prices', data: { section: 'prices' } },
      { path: 'prices/add', data: { section: 'prices/add' } },
      { path: 'publishers', data: { section: 'publishers' } },
      { path: 'publishers/add', data: { section: 'publishers/add' } },
      { path: 'subscribe', data: { section: 'subscribe' } },
      { path: '', redirectTo: 'details' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleRoutingModule {}
