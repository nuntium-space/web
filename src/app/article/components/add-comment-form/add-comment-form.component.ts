import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IArticle, IComment } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.scss']
})
export class AddCommentFormComponent
{
  @Input()
  public article?: IArticle;

  @Input()
  public parent: IComment | null;

  @Output()
  public commentCreated = new EventEmitter<IComment>();

  public form = new FormGroup({
    content: new FormControl(),
  });

  constructor(private api: ApiService)
  {
    this.parent ??= null;
  }

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.article)
    {
      failure();

      return;
    }

    const response = await this.api
      .createComment(this.article.id, {
        content: this.form.get("content")?.value ?? "",
        parent: this.parent?.id ?? null,
      });

    this.form.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.field === "content")
    });

    if (!response.success)
    {
      failure({
        message: {
          type: "none",
        },
      });

      return;
    }

    success();

    this.form.reset();

    this.commentCreated.emit(response.data);
  }
}
