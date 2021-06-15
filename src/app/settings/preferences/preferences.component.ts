import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserSettingsService } from 'src/app/shared/services/user-settings/user-settings.service';
import { Config } from 'src/config/Config';

@Component({
  selector: 'settings-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent
{
  public languageForm = new FormGroup({
    language: new FormControl(this.userSettings.userSettings?.language),
  });

  public languages = Config.LANGUAGES;

  constructor(public userSettings: UserSettingsService, private api: ApiService, private auth: AuthService, private translate: TranslateService)
  {}

  public async onLanguageChangeSubmit(end: () => void)
  {
    if (!this.auth.user)
    {
      return;
    }

    const language = this.languageForm.get("language")?.value ?? "";

    const response = await this.api.updateUserSettings(this.auth.user.id, {
      language,
    });

    end();

    if (!response.errors)
    {
      this.userSettings.userSettings ??= { language };
      this.userSettings.userSettings.language = language;

      this.translate.use(language);
    }
  }
}
