import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingsService } from './services/user-settings/user-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'nuntium';

  constructor(translate: TranslateService, userSettings: UserSettingsService)
  {
    const language = userSettings.userSettings?.language ?? translate.getBrowserLang();

    translate.use(language);
  }
}
