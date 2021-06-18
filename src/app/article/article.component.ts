import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '../services/api/api.service';
import { ConfirmEventCallback } from '../shared/components/form/form.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { FormatService } from '../shared/services/format/format.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-article',
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

  public sources?: string[];

  public isUpdatingArticle = false;

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
      this.router.navigateByUrl(`/~${this.article.author.publisher.id}`);
    }
  }
}
