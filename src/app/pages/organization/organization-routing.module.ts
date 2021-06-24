import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../../shared/guards/signed-in/signed-in.guard';
import { OrganizationComponent } from './organization.component';

const routes: Routes = [
  {
    path: "",
    component: OrganizationComponent,
    canActivate: [ SignedInGuard ],
    children: [
      { path: "bundles", data: { section: "bundles" } },
      { path: "bundles/create", data: { section: "bundles/create" } },
      { path: "details", data: { section: "details" } },
      { path: "publishers", data: { section: "publishers" } },
      { path: "publishers/create", data: { section: "publishers/create" } },
      { path: "", redirectTo: "details" },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class OrganizationRoutingModule
{}
