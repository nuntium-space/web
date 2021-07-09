import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IArticle, IBundle, IAuthor } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Config } from 'src/config/Config';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-author-public-page',
  templateUrl: './author-public-page.component.html',
  styleUrls: ['./author-public-page.component.scss'],
})
export class AuthorPublicPageComponent implements OnInit {
  public isSubscribed = true;

  public author?: IAuthor;

  public articles?: IArticle[];

  public bundles?: IBundle[];

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  public ngOnInit() {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.api.retrieveAuthor(id).then((response) => {
          if (response.success) {
            this.author = response.data;

            this.title.setTitle(
              `${this.author.user.full_name}${Config.PAGE_TITLE_SUFFIX}`
            );
          }
        });

        this.api.listArticlesForAuthor(id).then((response) => {
          // Payment Required
          if (response.status === 402) {
            this.articles = response.raw;

            this.isSubscribed = false;

            return;
          }

          this.articles = response.data;
        });
      },
    });
  }
}
