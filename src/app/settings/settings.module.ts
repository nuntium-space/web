import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdvancedComponent } from './pages/advanced/advanced.component';
import { AccountDetailsComponent } from './pages/details/details.component';
import { SettingsMenuComponent } from './components/menu/menu.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { UserPublishersComponent } from './pages/publishers/publishers.component';
import { CreateOrganizationComponent } from './pages/organizations/create/create.component';
import { AddPaymentMethodComponent } from './pages/payment-methods/add/add.component';
import { SecurityComponent } from './pages/security/security.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { SettingsComponent } from './settings.component';
import { ApiService } from './services/api/api.service';

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
    SettingsRoutingModule,
  ],
  providers: [
    ApiService,
  ],
})
export class SettingsModule
{}
