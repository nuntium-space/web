import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../shared/guards/signed-in/signed-in.guard';
import { BundleDetailsComponent } from './details/details.component';
import { AddPriceComponent } from './prices/add/add.component';
import { PricesComponent } from './prices/prices.component';
import { AddPublisherComponent } from './publishers/add/add.component';
import { BundlePublishersComponent } from './publishers/publishers.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  { path: "details", component: BundleDetailsComponent },
  {
    path: "prices",
    children: [
      { path: "add", component: AddPriceComponent },
      { path: "", component: PricesComponent },
    ],
  },
  { path: "subscribe", component: SubscribeComponent },
  {
    path: "publishers",
    children: [
      { path: "add", component: AddPublisherComponent },
      { path: "", component: BundlePublishersComponent },
    ],
  },
  { path: "", component: BundleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundleRoutingModule { }
