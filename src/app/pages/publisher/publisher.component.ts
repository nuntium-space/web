import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { IPublisher } from '../../services/api/api.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
})
export class PublisherComponent implements OnInit {
  public publisher?: IPublisher;

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
        this.api.retrievePublisher(id).then((publisher) => {
          this.publisher = publisher.data;
        });
      },
    });
  }

  public onUpdate(publisher: IPublisher) {
    this.publisher = publisher;
  }
}
