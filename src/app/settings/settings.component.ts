import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent
{
  public section?: string;

  constructor(private route: ActivatedRoute, private router: Router)
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
}
