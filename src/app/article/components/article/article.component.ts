import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-article',
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

    // Create a draft from the current article (an article cannot be updated directly)
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
