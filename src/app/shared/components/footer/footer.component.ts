import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from 'src/config/Config';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent
{
  public readonly languages = Config.LANGUAGES;
  public currentLanguage;

  constructor(private translate: TranslateService)
  {
    this.currentLanguage = translate.currentLang;
  }

  public onLanguageChange(e: Event)
  {
    const target = e.target as HTMLSelectElement;

    const lang = target.selectedOptions.item(0)?.value ?? this.currentLanguage;

    this.translate.use(lang);

    sessionStorage.setItem("lang", lang);
  }
}
