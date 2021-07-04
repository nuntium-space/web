import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { createTranslationLoader } from './shared/shared.module';
import { AuthService } from './shared/services/auth/auth.service';
import { UserSettingsService } from './shared/services/user-settings/user-settings.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Config } from 'src/config/Config';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
    }),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslationLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (
        auth: AuthService,
        translate: TranslateService,
        userSettings: UserSettingsService
      ) => {
        return async (): Promise<any> => {
          let language =
            sessionStorage.getItem('lang') ?? translate.getBrowserLang();

          await auth.init();

          if (auth.user) {
            await userSettings.init();

            language = userSettings.userSettings?.language ?? language;
          }

          if (!Config.LANGUAGES.find((_) => _.id === language)) {
            language = 'en';
          }

          await translate.use(language).toPromise();

          return;
        };
      },
      deps: [AuthService, TranslateService, UserSettingsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
