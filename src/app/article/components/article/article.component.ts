import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleDraft } from 'src/app/publisher-public-page/services/api/api.service';
import { IArticle } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
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
  public updateArticleForm = new FormGroup({
    title: new FormControl(),
  });

  public isSubscribed = true;

  public article?: IArticle;
  public draft?: IArticleDraft;

  public sources?: string[];

  public isUpdatingArticle = false;

  public isDraft = false;

  constructor(public auth: AuthService, public format: FormatService, public route: ActivatedRoute, private api: ApiService, private router: Router)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: (params) =>
      {
        this.isDraft = params.id.startsWith("dft_");

        if (this.isDraft)
        {
          this.api
            .retrieveDraft(params.id)
            .then(response =>
            {
              this.draft = response.data;

              this.updateArticleForm.get("title")?.setValue(this.article?.title);
            });

          return;
        }

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

            this.updateArticleForm.get("title")?.setValue(this.article?.title);
          });
      },
    });
  }

  public onSourceInput(e: Event, i: number)
  {
    if (!this.sources)
    {
      return;
    }

    this.sources[i] = (e.target as HTMLInputElement).value;
  }

  public trackByFn(index: number, item: string)
  {
    return index;
  }

  public async updateArticle([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.article)
    {
      failure();

      return;
    }

    const response = await this.api
      .updateArticle(this.article.id, {
        title: this.updateArticleForm.get("title")?.value ?? "",
        content: this.article.content,
      });

    this.updateArticleForm.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.field === "title")
    });

    this.updateArticleForm.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.field === "content")
    });

    if (!response.success)
    {
      failure({
        message: {
          type: "none",
        },
      });

      return;
    }

    success();

    this.isUpdatingArticle = false;

    this.article = response.data;
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
