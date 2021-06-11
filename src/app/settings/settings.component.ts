import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Config } from 'src/config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit
{
  public section?: string;

  constructor(private route: ActivatedRoute, private router: Router, private title: Title, private translate: TranslateService)
  {
    this.router.events
      .pipe(
        filter(_ => _ instanceof NavigationEnd),
        switchMap(() =>
        {
          return this.route.firstChild?.data ?? of({});
        }),
      )
      .subscribe(({ section }) =>
      {
        this.section = section;
      });
  }

  public ngOnInit()
  {
    this.title.setTitle(`${this.translate.instant("settings.__title")}${Config.PAGE_TITLE_SUFFIX}`);
  }
}
