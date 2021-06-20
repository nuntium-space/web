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

  constructor(translate: TranslateService)
  {
    this.currentLanguage = translate.currentLang;
  }
}
