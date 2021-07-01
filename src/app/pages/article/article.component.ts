import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/config/Config';
import { IArticle } from '../../services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormatService } from '../../shared/services/format/format.service';
import { ApiService, IArticleSource } from './services/api/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit
{
  public article?: IArticle;
  public sources?: IArticleSource[];

  public isSubscribed = true;

  constructor(public auth: AuthService, public format: FormatService, public route: ActivatedRoute, private api: ApiService, private router: Router, private title: Title)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: (params) =>
      {
        this.api
          .retrieveArticle(params.id)
          .then(response =>
          {
            // Payment Required
            if (response.status === 402)
            {
              this.article = response.raw;

              this.isSubscribed = false;

              return;
            }

            if (response.data)
            {
              this.article = response.data;

              this.title.setTitle(`${this.article.title} - ${this.article.author.publisher.name}${Config.PAGE_TITLE_SUFFIX}`);
            }
          });

        this.api
          .retrieveSources(params.id)
          .then(response =>
          {
            if (response.data)
            {
              this.sources = response.data;
            }
          });
      },
    });
  }

  public async createUpdateDraft()
  {
    if (!this.article)
    {
      return;
    }

    const response = await this.api.createDraftFromArticle(this.article);

    if (response.success)
    {
      this.router.navigateByUrl(`/draft/${response.data?.id}`);
    }
  }

  public async deleteArticle()
  {
    if (!this.article)
    {
      return;
    }

    const response = await this.api.deleteArticle(this.article.id);

    if (response.success)
    {
      this.router.navigateByUrl(`/p/${this.article.author.publisher.id}`);
    }
  }
}
