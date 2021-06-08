import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundleComponent } from './bundle.component';

const routes: Routes = [
  {
    path: "",
    component: BundleComponent,
    children: [
      { path: "details", data: { section: "details" } },
      { path: "prices", data: { section: "prices" } },
      { path: "prices/add", data: { section: "prices/add" } },
      { path: "subscribe", data: { section: "subscribe" } },
      { path: "publishers", data: { section: "publishers" } },
      { path: "publishers/add", data: { section: "publishers/add" } },
      { path: "", redirectTo: "details" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundleRoutingModule { }
