import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IAuthor } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'write-new-article',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class WriteNewArticleComponent implements OnInit
{
  private author?: IAuthor;

  public form = new FormGroup({
    title: new FormControl(),
  });

  public sources: string[] = [ "" ];

  public editorContent?: any;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private auth: AuthService)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: params =>
      {
        if (!this.auth.user)
        {
          return;
        }

        this.api
          .retrieveAuthorForUserAndPublisher(this.auth.user.id, params.id)
          .then(response =>
          {
            this.author = response.data?.[0];
          });
      },
    });
  }

  public onSourceInput(e: Event, i: number)
  {
    this.sources[i] = (e.target as HTMLInputElement).value;
  }

  public trackByFn(index: number, item: string)
  {
    return index;
  }

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.author)
    {
      failure();

      return;
    }

    const response = await this.api
      .createArticle(this.author.id, {
        title: this.form.get("title")?.value ?? "",
        content: this.editorContent,
        sources: this.sources.map(_ => ({ url: _ })),
      });

    this.form.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.field === "title")
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

    this.router.navigate([ ".." ], {
      relativeTo: this.route,
    });
  }
}
