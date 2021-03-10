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
  public comment?: IComment;

  public showReplyForm = false;

  constructor()
  {}

  public onCommentCreated(comment: IComment)
  {
    this.showReplyForm = false;

    console.log(comment);
  }
}
