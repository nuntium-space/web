import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { IOrganization } from '../../services/api/api.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  public organization?: IOrganization;

  public section?: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((_) => _ instanceof NavigationEnd),
        switchMap(() => {
          return this.route.firstChild?.data ?? of({});
        })
      )
      .subscribe(({ section }) => {
        this.section = section;
      });
  }

  public ngOnInit() {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.api.retrieveOrganization(id).then((organization) => {
          this.organization = organization.data;
        });
      },
    });
  }

  public onUpdate(organization: IOrganization) {
    this.organization = organization;
  }
}
