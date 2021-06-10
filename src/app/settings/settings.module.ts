import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdvancedComponent } from './advanced/advanced.component';
import { AccountDetailsComponent } from './details/details.component';
import { SettingsMenuComponent } from './menu/menu.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { UserPublishersComponent } from './publishers/publishers.component';
import { CreateOrganizationComponent } from './organizations/create/create.component';
import { AddPaymentMethodComponent } from './payment-methods/add/add.component';
import { SecurityComponent } from './security/security.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [
    SettingsComponent,
    AdvancedComponent,
    AccountDetailsComponent,
    SettingsMenuComponent,
    OrganizationsComponent,
    CreateOrganizationComponent,
    PaymentMethodsComponent,
    AddPaymentMethodComponent,
    PreferencesComponent,
    UserPublishersComponent,
    SecurityComponent,
    SubscriptionsComponent,
    SubscriptionListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
