import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IArticle, IComment } from '../services/api/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent
{
  public article?: IArticle;

  public comments?: IComment[];

  public addCommentForm = new FormGroup({
    content: new FormControl(),
  });

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: (params) =>
      {
        api.retrieveArticle(params.id).then((response) =>
        {
          this.article = response.data;
        });

        api.listCommentsForArticle(params.id, null).then((response) =>
        {
          this.comments = response.data;
        });
      },
    });
  }

  public async onAddCommentFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.article)
    {
      return;
    }

    const response = await this.api.createComment(this.article.id, {
      content: this.addCommentForm.get("content")?.value ?? "",
      parent: null,
    });

    this.addCommentForm.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"content"`))
    });

    if (response.data)
    {
      this.addCommentForm.reset();

      this.comments?.push(response.data);
    }
  }
}
