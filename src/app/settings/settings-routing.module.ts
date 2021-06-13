import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    canActivate: [ SignedInGuard ],
    children: [
      { path: "advanced", data: { section: "advanced" } },
      { path: "details", data: { section: "details" } },
      { path: "organizations", data: { section: "organizations" } },
      { path: "organizations/create", data: { section: "organizations/create" } },
      { path: "payment-methods", data: { section: "payment-methods" } },
      { path: "payment-methods/add", data: { section: "payment-methods/add" } },
      { path: "preferences", data: { section: "preferences" } },
      { path: "publishers", data: { section: "publishers" } },
      { path: "security", data: { section: "security" } },
      { path: "subscriptions", data: { section: "subscriptions" } },
      { path: "", redirectTo: "details" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
