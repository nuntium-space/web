import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationBundlesComponent } from './pages/bundles/bundles.component';
import { CreateBundleComponent } from './pages/bundles/create/create.component';
import { OrganizationDetailsComponent } from './pages/details/details.component';
import { OrganizationMenuComponent } from './components/menu/menu.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
import { CreatePublisherComponent } from './pages/publishers/create/create.component';
import { StripeConnectButtonComponent } from './components/stripe-connect-button/stripe-connect-button.component';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationBundlesComponent,
    CreateBundleComponent,
    OrganizationDetailsComponent,
    OrganizationMenuComponent,
    PublishersComponent,
    CreatePublisherComponent,
    StripeConnectButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationRoutingModule,
  ],
  providers: [
    ApiService,
  ],
})
export class OrganizationModule
{}
