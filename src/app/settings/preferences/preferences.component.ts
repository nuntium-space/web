import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, ILanguage } from 'src/app/services/api/api.service';

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

  public languages?: ILanguage[];

  constructor(private api: ApiService)
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

    // TODO
  }
}
