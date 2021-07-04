import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedOutGuard } from '../../shared/guards/signed-out/signed-out.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SignedOutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
