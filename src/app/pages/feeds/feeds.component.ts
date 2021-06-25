import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Config } from 'src/config/Config';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent
{
  public section?: string;

  constructor(route: ActivatedRoute, router: Router, title: Title)
  {
    title.setTitle(Config.DEFAULT_PAGE_TITLE);

    router.events
      .pipe(
        filter(_ => _ instanceof NavigationEnd),
        switchMap(() =>
        {
          return route.firstChild?.data ?? of({});
        }),
      )
      .subscribe(({ section }) =>
      {
        this.section = section;
      });
  }
}
