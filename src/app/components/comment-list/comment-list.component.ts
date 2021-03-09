import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/services/api/api.service';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent
{
  @Input("parent")
  public parent: IComment | null;

  @Input("comments")
  public comments?: IComment[];

  constructor()
  {
    this.parent ??= null;
  }

  public childrenOf(parent: IComment | null): IComment[]
  {
    return (this.comments ?? []).filter(comment => comment.parent?.id === parent?.id);
  }
}
