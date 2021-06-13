import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedOutGuard } from '../shared/guards/signed-out/signed-out.guard';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: "",
    component: SignInComponent,
    canActivate: [ SignedOutGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
