import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent
{
  public section?: string;

  constructor(auth: AuthService, router: Router, route: ActivatedRoute)
  {
    if (auth.user?.type !== "admin")
    {
      router.navigateByUrl("/");
    }

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
