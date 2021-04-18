import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiService, ILanguage, IUserSettings } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserSettingsService } from 'src/app/services/user-settings/user-settings.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit
{
  public languageForm = new FormGroup({
    language: new FormControl(this.userSettings.userSettings?.language),
  });

  public languages?: ILanguage[];

  constructor(public userSettings: UserSettingsService, private api: ApiService, private auth: AuthService, private translate: TranslateService)
  {}

  ngOnInit(): void
  {
    this.api.listSupportedLanguages().then(response =>
    {
      this.languages = response.data;
    });
  }

  public async onLanguageChangeSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user)
    {
      return;
    }

    const language = this.languageForm.get("language")?.value ?? "";

    const response = await this.api.updateUserSettings(this.auth.user.id, {
      language,
    });

    if (!response.errors)
    {
      this.userSettings.userSettings ??= { language };
      this.userSettings.userSettings.language = language;

      this.translate.use(language);
    }
  }
}
