import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublisherPublicPageComponent } from './publisher-public-page/publisher-public-page.component';
import { WriteNewArticleComponent } from './publisher-public-page/new/new.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslationLoader, SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth/auth.service';
import { UserSettingsService } from './shared/services/user-settings/user-settings.service';
import { SignedInComponent } from './home/signed-in/signed-in.component';
import { SignedOutComponent } from './home/signed-out/signed-out.component';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/config/Config';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    PublisherPublicPageComponent,
    WriteNewArticleComponent,
    SignedInComponent,
    SignedOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslationLoader),
        deps: [ HttpClient ],
      },
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

          let language = userSettings.userSettings?.language ?? translate.getBrowserLang();

          if (!Config.LANGUAGES.find(_ => _.id === language))
          {
            language = "en";
          }

          await translate.use(language).toPromise();

          return;
        };
      },
      deps: [ AuthService, TranslateService, UserSettingsService ],
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule
{}
