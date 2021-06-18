import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { IBundle } from '../services/api/api.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss']
})
export class BundleComponent implements OnInit
{
  public bundle?: IBundle;

  public section?: string;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router)
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
    this.route.params.subscribe({
      next: ({ id }) =>
      {
        this.api
          .retrieveBundle(id)
          .then(bundle =>
          {
            this.bundle = bundle.data;
          });
      },
    });
  }

  public onUpdate(bundle: IBundle)
  {
    this.bundle = bundle;
  }
}
