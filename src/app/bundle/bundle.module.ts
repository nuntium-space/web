import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BundleRoutingModule } from './bundle-routing.module';
import { BundleDetailsComponent } from './details/details.component';
import { BundleMenuComponent } from './menu/menu.component';
import { AddPublisherComponent } from './publishers/add/add.component';
import { BundlePublishersComponent } from './publishers/publishers.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SharedModule } from '../shared/shared.module';
import { PricesComponent } from './prices/prices.component';
import { AddPriceComponent } from './prices/add/add.component';

@NgModule({
  declarations: [
    /*
      COMPONENTS
    */
    BundleMenuComponent,
    AddPublisherComponent,
    BundleDetailsComponent,
    BundlePublishersComponent,
    SubscribeComponent,
    PricesComponent,
    AddPriceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BundleRoutingModule
  ]
})
export class BundleModule { }
