import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationBundlesComponent } from './bundles/bundles.component';
import { CreateBundleComponent } from './bundles/create/create.component';
import { OrganizationDetailsComponent } from './details/details.component';
import { OrganizationMenuComponent } from './menu/menu.component';
import { PublishersComponent } from './publishers/publishers.component';
import { CreatePublisherComponent } from './publishers/create/create.component';
import { StripeConnectButtonComponent } from './components/stripe-connect-button/stripe-connect-button.component';


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
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
