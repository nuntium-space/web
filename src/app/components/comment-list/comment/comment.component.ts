import { Component, Input } from '@angular/core';
import { ApiService, IArticle, IComment } from 'src/app/services/api/api.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent
{
  @Input()
  public article?: IArticle;

  @Input()
  public comment?: IComment;

  public replies?: IComment[];

  public showReplyForm = false;

  constructor(private api: ApiService)
  {}

  public async loadReplies(e: Event)
  {
    if (!this.article || !this.comment || this.replies)
    {
      return;
    }

    const response = await this.api.listCommentsForArticle(this.article.id, this.comment.id);

    this.replies = response.data;
  }

  public onCommentCreated(comment: IComment)
  {
    this.showReplyForm = false;

    console.log(comment);
  }
}
