import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { PublisherComponent } from './publisher.component';

const routes: Routes = [
  {
    path: "",
    component: PublisherComponent,
    canActivate: [ SignedInGuard ],
    children: [
      { path: "authors", data: { section: "authors" } },
      { path: "authors/invite", data: { section: "authors/invite" } },
      { path: "details", data: { section: "details" } },
      { path: "verify", data: { section: "verify" } },
      { path: "", redirectTo: "details" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublisherRoutingModule { }
