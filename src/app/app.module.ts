import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { AuthService } from './services/auth/auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountDetailsComponent } from './settings/details/details.component';
import { SecurityComponent } from './settings/security/security.component';
import { OrganizationsComponent } from './settings/organizations/organizations.component';
import { SettingsMenuComponent } from './settings/menu/menu.component';
import { IndexComponent } from './index/index.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
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
import { ArticleComponent } from './article/article.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { AddCommentFormComponent } from './components/add-comment-form/add-comment-form.component';
import { CommentComponent } from './components/comment-list/comment/comment.component';
import { OrganizationBundlesComponent } from './organization/bundles/bundles.component';
import { CreateBundleComponent } from './organization/bundles/create/create.component';
import { BundleMenuComponent } from './bundle/menu/menu.component';
import { AddPublisherComponent } from './bundle/publishers/add/add.component';
import { BundleDetailsComponent } from './bundle/details/details.component';
import { BundlePublishersComponent } from './bundle/publishers/publishers.component';
import { SubscriptionsComponent } from './settings/subscriptions/subscriptions.component';
import { StripeConnectButtonComponent } from './components/stripe/connect-button/connect-button.component';
import { ExploreComponent } from './explore/explore.component';
import { SubscribeComponent } from './bundle/subscribe/subscribe.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { AddPaymentMethodComponent } from './settings/payment-methods/add/add.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { WriteNewArticleComponent } from './publisher-public-page/new/new.component';
import { KeepHtmlPipe } from './pipes/keep-html/keep-html.pipe';
import { AdvancedComponent } from './settings/advanced/advanced.component';
import { PricesComponent } from './bundle/prices/prices.component';
import { AddPriceComponent } from './bundle/prices/add/add.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationLoader } from './miscellaneous/TranslationLoader';
import { FooterComponent } from './components/footer/footer.component';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { UserSettingsService } from './services/user-settings/user-settings.service';
import { DangerButtonComponent } from './components/danger-button/danger-button.component';
import { BadgeComponent } from './components/badge/badge.component';

export const createTranslationLoader = (http: HttpClient) =>
{
  return new TranslationLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    FeedComponent,
    PageNotFoundComponent,
    AccountDetailsComponent,
    SecurityComponent,
    OrganizationsComponent,
    SettingsMenuComponent,
    IndexComponent,
    SpinnerComponent,
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
    ArticleComponent,
    CommentListComponent,
    AddCommentFormComponent,
    CommentComponent,
    OrganizationBundlesComponent,
    CreateBundleComponent,
    BundleMenuComponent,
    AddPublisherComponent,
    BundleDetailsComponent,
    BundlePublishersComponent,
    SubscriptionsComponent,
    StripeConnectButtonComponent,
    ExploreComponent,
    SubscribeComponent,
    PaymentMethodsComponent,
    AddPaymentMethodComponent,
    SubscriptionListComponent,
    WriteNewArticleComponent,
    KeepHtmlPipe,
    AdvancedComponent,
    PricesComponent,
    AddPriceComponent,
    FooterComponent,
    PreferencesComponent,
    DangerButtonComponent,
    BadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslationLoader),
        deps: [ HttpClient ],
      },
      defaultLanguage: "en",
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
