import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundleComponent } from './bundle.component';
import { BundleDetailsComponent } from './details/details.component';
import { AddPriceComponent } from './prices/add/add.component';
import { PricesComponent } from './prices/prices.component';
import { AddPublisherComponent } from './publishers/add/add.component';
import { BundlePublishersComponent } from './publishers/publishers.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  {
    path: "",
    component: BundleComponent,
    children: [
      { path: "details", data: { section: "details" }, component: BundleDetailsComponent },
      {
        path: "prices", data: { section: "prices" },
        children: [
          { path: "add", component: AddPriceComponent },
          { path: "", component: PricesComponent },
        ],
      },
      { path: "subscribe", data: { section: "subscribe" }, component: SubscribeComponent },
      {
        path: "publishers", data: { section: "publishers" },
        children: [
          { path: "add", component: AddPublisherComponent },
          { path: "", component: BundlePublishersComponent },
        ],
      },
      { path: "", redirectTo: "details" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundleRoutingModule { }
