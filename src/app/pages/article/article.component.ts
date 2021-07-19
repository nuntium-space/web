import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Config } from 'src/config/Config';
import { IArticle } from '../../services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormatService } from '../../shared/services/format/format.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public section?: string;

  public article?: IArticle;

  public isSubscribed = true;

  constructor(
    public auth: AuthService,
    public format: FormatService,
    public route: ActivatedRoute,
    private api: ApiService,
    private title: Title,
    router: Router
  ) {
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

  public ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        this.api.retrieveArticle(params.id).then((response) => {
          // Payment Required
          if (response.status === 402) {
            this.article = response.raw;

            this.isSubscribed = false;

            return;
          }

          if (response.data) {
            this.article = response.data;

            this.title.setTitle(
              `${this.article.title} - ${this.article.author.publisher.name}${Config.PAGE_TITLE_SUFFIX}`
            );
          }
        });
      },
    });
  }
}
