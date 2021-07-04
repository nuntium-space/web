import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Config } from 'src/config/Config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public section?: string;

  constructor(
    auth: AuthService,
    router: Router,
    route: ActivatedRoute,
    title: Title,
    translate: TranslateService
  ) {
    if (auth.user?.type !== 'admin') {
      router.navigateByUrl('/');
    }

    translate.get('admin.__title').subscribe({
      next: (value) => {
        title.setTitle(`${value}${Config.PAGE_TITLE_SUFFIX}`);
      },
    });

    router.events
      .pipe(
        filter((_) => _ instanceof NavigationEnd),
        switchMap(() => {
          return route.firstChild?.data ?? of({});
        })
      )
      .subscribe(({ section }) => {
        this.section = section;
      });
  }
}
