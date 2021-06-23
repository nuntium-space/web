import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { DraftComponent } from './draft.component';

const routes: Routes = [
  {
    path: "",
    component: DraftComponent,
    canActivate: [ SignedInGuard ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DraftRoutingModule
{}
