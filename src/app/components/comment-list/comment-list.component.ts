import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/services/api/api.service';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent
{
  @Input("comments")
  public comments?: IComment[];

  constructor()
  {}

  public childrenOf(id: string): IComment[]
  {
    return (this.comments ?? []).filter(comment => comment.parent?.id === id);
  }
}
