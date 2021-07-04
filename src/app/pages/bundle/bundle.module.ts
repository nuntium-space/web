import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BundleRoutingModule } from './bundle-routing.module';
import { BundleComponent } from './bundle.component';
import { BundleDetailsComponent } from './pages/details/details.component';
import { BundleMenuComponent } from './components/menu/menu.component';
import { AddPublisherComponent } from './pages/publishers/add/add.component';
import { BundlePublishersComponent } from './pages/publishers/publishers.component';
import { SharedModule } from '../../shared/shared.module';
import { PricesComponent } from './pages/prices/prices.component';
import { AddPriceComponent } from './pages/prices/add/add.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    BundleComponent,
    BundleMenuComponent,
    AddPublisherComponent,
    BundleDetailsComponent,
    BundlePublishersComponent,
    PricesComponent,
    AddPriceComponent,
    SubscribeComponent,
  ],
  imports: [CommonModule, SharedModule, BundleRoutingModule],
  providers: [ApiService],
})
export class BundleModule {}
