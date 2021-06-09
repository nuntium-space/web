import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: "",
    component: SignInComponent,
    canActivate: [ SignedInGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
