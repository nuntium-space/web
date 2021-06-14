import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IArticle, IComment } from '../services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { FormatService } from '../shared/services/format/format.service';

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

  public comments: IComment[] = [];

  public isUpdatingArticle = false;

  constructor(public auth: AuthService, public format: FormatService, public route: ActivatedRoute, private api: ApiService, private router: Router)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: (params) =>
      {
        this.api.retrieveArticle(params.id).then((response) =>
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
          }
        });

        this.api.listCommentsForArticle(params.id, null).then((response) =>
        {
          if (response.data)
          {
            this.comments = response.data;
          }
        });
      },
    });
  }

  public async updateArticle(end: () => void)
  {
    if (!this.article)
    {
      return;
    }

    const response = await this.api.updateArticle(this.article.id, {
      title: this.updateArticleForm.get("title")?.value ?? "",
      content: this.article.content,
    });

    end();

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
