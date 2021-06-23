import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleDraft } from 'src/app/publisher-public-page/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit
{
  public updateForm = new FormGroup({
    title: new FormControl(),
  });

  public draft?: IArticleDraft;

  public sources?: string[];

  public isUpdating = false;

  constructor(public auth: AuthService, public format: FormatService, public route: ActivatedRoute, private api: ApiService, private router: Router)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: (params) =>
      {
        this.api
          .retrieveDraft(params.id)
          .then(response =>
          {
            this.draft = response.data;

            this.updateForm.get("title")?.setValue(this.draft?.title);
          });
      },
    });
  }

  public onSourceInput(e: Event, i: number)
  {
    if (!this.sources)
    {
      return;
    }

    this.sources[i] = (e.target as HTMLInputElement).value;
  }

  public trackByFn(index: number, item: string)
  {
    return index;
  }

  public async update([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.draft)
    {
      failure();

      return;
    }

    const response = await this.api
      .updateArticle(this.draft.id, {
        title: this.updateForm.get("title")?.value ?? "",
        content: this.draft.content,
      });

    this.updateForm.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.field === "title")
    });

    this.updateForm.get("content")?.setErrors({
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

    this.isUpdating = false;

    // TODO: this.draft = response.data;
  }

  public async deleteArticle()
  {
    if (!this.draft)
    {
      return;
    }

    const response = await this.api.deleteArticle(this.draft.id);

    if (!response.errors)
    {
      this.router.navigateByUrl(`/p/${this.draft.author.publisher.id}`);
    }
  }
}