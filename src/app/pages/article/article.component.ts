import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '../../services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormatService } from '../../shared/services/format/format.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit
{
  public article?: IArticle;
  public sources?: string[];

  public isSubscribed = true;

  constructor(public auth: AuthService, public format: FormatService, public route: ActivatedRoute, private api: ApiService, private router: Router)
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

            this.article = response.data;
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

    if (!response.errors)
    {
      this.router.navigateByUrl(`/p/${this.article.author.publisher.id}`);
    }
  }
}
