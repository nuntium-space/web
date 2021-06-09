import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountDetailsComponent } from './settings/details/details.component';
import { SecurityComponent } from './settings/security/security.component';
import { OrganizationsComponent } from './settings/organizations/organizations.component';
import { SettingsMenuComponent } from './settings/menu/menu.component';
import { CreateOrganizationComponent } from './settings/organizations/create/create.component';
import { OrganizationDetailsComponent } from './organization/details/details.component';
import { PublishersComponent } from './organization/publishers/publishers.component';
import { OrganizationMenuComponent } from './organization/menu/menu.component';
import { CreatePublisherComponent } from './organization/publishers/create/create.component';
import { AuthorsComponent } from './publisher/authors/authors.component';
import { PublisherMenuComponent } from './publisher/menu/menu.component';
import { PublisherDetailsComponent } from './publisher/details/details.component';
import { InviteAuthorComponent } from './publisher/authors/invite/invite.component';
import { UserPublishersComponent } from './settings/publishers/publishers.component';
import { PublisherPublicPageComponent } from './publisher-public-page/publisher-public-page.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { OrganizationBundlesComponent } from './organization/bundles/bundles.component';
import { SubscriptionsComponent } from './settings/subscriptions/subscriptions.component';
import { StripeConnectButtonComponent } from './components/stripe/connect-button/connect-button.component';
import { ExploreComponent } from './explore/explore.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { AddPaymentMethodComponent } from './settings/payment-methods/add/add.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { WriteNewArticleComponent } from './publisher-public-page/new/new.component';
import { AdvancedComponent } from './settings/advanced/advanced.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { VerifyPublisherComponent } from './publisher/verify/verify.component';
import { createTranslationLoader, SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth/auth.service';
import { UserSettingsService } from './shared/services/user-settings/user-settings.service';
import { SignedInComponent } from './home/signed-in/signed-in.component';
import { SignedOutComponent } from './home/signed-out/signed-out.component';
import { CreateBundleComponent } from './organization/bundles/create/create.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccountDetailsComponent,
    SecurityComponent,
    OrganizationsComponent,
    SettingsMenuComponent,
    CreateOrganizationComponent,
    OrganizationMenuComponent,
    OrganizationDetailsComponent,
    PublishersComponent,
    CreatePublisherComponent,
    AuthorsComponent,
    PublisherMenuComponent,
    PublisherDetailsComponent,
    InviteAuthorComponent,
    UserPublishersComponent,
    PublisherPublicPageComponent,
    ArticleListComponent,
    OrganizationBundlesComponent,
    CreateBundleComponent,
    SubscriptionsComponent,
    StripeConnectButtonComponent,
    ExploreComponent,
    PaymentMethodsComponent,
    AddPaymentMethodComponent,
    SubscriptionListComponent,
    WriteNewArticleComponent,
    AdvancedComponent,
    PreferencesComponent,
    VerifyPublisherComponent,
    SignedInComponent,
    SignedOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslationLoader),
        deps: [ HttpClient ],
      },
      defaultLanguage: "en",
      isolate: false,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService, translate: TranslateService, userSettings: UserSettingsService) =>
      {
        return async (): Promise<any> =>
        {
          await auth.init();

          await userSettings.init();

          const language = userSettings.userSettings?.language ?? translate.getBrowserLang();

          await translate.use(language).toPromise();

          return;
        };
      },
      deps: [ AuthService, TranslateService, UserSettingsService ],
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule
{}
