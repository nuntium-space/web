import { Component, Input } from '@angular/core';
import { IArticle, IComment } from 'src/app/services/api/api.service';

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
  public parent: IComment | null;

  @Input()
  public comment?: IComment;

  @Input()
  public replies?: IComment[];

  public showReplyForm = false;

  constructor()
  {
    this.parent ??= null;
  }

  public onCommentCreated(comment: IComment)
  {
    this.showReplyForm = false;

    this.replies?.push(comment);
  }
}
