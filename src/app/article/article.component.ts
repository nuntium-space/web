import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IArticle, IComment } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { FormatService } from '../services/format/format.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent
{
  public updateArticleForm = new FormGroup({
    title: new FormControl(),
    content: new FormControl(),
  });

  public isSubscribed = true;

  public article?: IArticle;

  public comments: IComment[] = [];

  public isUpdatingArticle = false;

  constructor(public auth: AuthService, public format: FormatService, private api: ApiService, private router: Router, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: (params) =>
      {
        api.retrieveArticle(params.id).then((response) =>
        {
          // Payment Required
          if (response.status === 402)
          {
            this.isSubscribed = false;
          }
          else if (response.data)
          {
            this.article = response.data;

            this.updateArticleForm.get("title")?.setValue(this.article.title);
            this.updateArticleForm.get("content")?.setValue(this.article.content); // TODO: Edit raw content
          }
        });

        api.listCommentsForArticle(params.id, null).then((response) =>
        {
          if (response.data)
          {
            this.comments = response.data;
          }
        });
      },
    });
  }

  public async updateArticle(e: Event)
  {
    e.preventDefault();

    if (!this.article)
    {
      return;
    }

    const response = await this.api.updateArticle(this.article.id, {
      title: this.updateArticleForm.get("title")?.value ?? "",
      content: this.updateArticleForm.get("content")?.value ?? "",
    });

    this.updateArticleForm.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.field === "title")
    });

    this.updateArticleForm.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.field === "content")
    });

    if (response.data)
    {
      this.isUpdatingArticle = false;

      this.article = response.data;

      this.updateArticleForm.get("title")?.setValue(this.article.title);
      this.updateArticleForm.get("content")?.setValue(this.article.content); // TODO: Edit raw content
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
      this.router.navigateByUrl(`/~${this.article.author.publisher.id}`);
    }
  }

  public onCommentCreated(comment: IComment)
  {
    this.comments.push(comment);
  }
}
