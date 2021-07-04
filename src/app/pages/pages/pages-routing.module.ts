import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForPublishersComponent } from './for-publishers/for-publishers.component';

const routes: Routes = [
  {
    path: 'for-publishers',
    component: ForPublishersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
