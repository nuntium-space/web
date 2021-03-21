import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IArticle, IComment } from '../services/api/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent
{
  public isSubscribed = true;

  public article?: IArticle;

  public comments: IComment[] = [];

  constructor(api: ApiService, route: ActivatedRoute)
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

            return;
          }

          this.article = response.data;
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

  public onCommentCreated(comment: IComment)
  {
    this.comments.push(comment);
  }
}
