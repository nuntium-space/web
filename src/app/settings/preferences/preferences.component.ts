import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, ILanguage, IUserSettings } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit
{
  public languageForm = new FormGroup({
    language: new FormControl(),
  });

  public userSettings?: IUserSettings;

  public languages?: ILanguage[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  ngOnInit(): void
  {
    this.api.listSupportedLanguages().then(response =>
    {
      this.languages = response.data;
    });

    if (this.auth.user)
    {
      this.api.retrieveUserSettings(this.auth.user.id).then(response =>
      {
        this.userSettings = response.data;
      });
    }
  }

  public async onLanguageChangeSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user)
    {
      return;
    }

    await this.api.updateUserSettings(this.auth.user.id, {
      language: this.languageForm.get("language")?.value,
    });
  }
}
