import { Component, Input } from '@angular/core';
import { IArticle, IComment } from 'src/app/services/api/api.service';

@Component({
  selector: 'article-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent
{
  @Input("article")
  public article?: IArticle;

  @Input("comments")
  public comments?: IComment[];
}
