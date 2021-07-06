import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { IDialogButton } from 'src/app/shared/components/dialog/dialog.component';
import { Config } from 'src/config/Config';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormatService } from '../../shared/services/format/format.service';
import {
  ApiService,
  IArticleDraft,
  IArticleDraftSource,
} from './services/api/api.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
})
export class DraftComponent implements OnInit {
  public updateForm = new FormGroup({
    title: new FormControl(),
  });

  public draft?: IArticleDraft;

  public sources?: IArticleDraftSource[];

  public isUpdating = false;

  public showRejectDialog = false;
  public rejectDialogButtons: IDialogButton[] = [
    {
      text: 'generic.confirm',
      classes: ['dark', 'danger'],
      onClick: () => {
        this.showRejectDialog = false;

        this.reject();
      },
    },
    {
      text: 'generic.cancel',
      classes: ['dark'],
      onClick: () => (this.showRejectDialog = false),
    },
  ];

  @ViewChild('rejectionReasonTextArea')
  public rejectionReasonTextArea?: ElementRef<HTMLTextAreaElement>;

  constructor(
    public auth: AuthService,
    public format: FormatService,
    public route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private title: Title
  ) {}

  public ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        this.api.retrieveDraft(params.id).then((response) => {
          if (response.data) {
            this.draft = response.data;

            this.updateForm.get('title')?.setValue(this.draft.title);

            this.title.setTitle(
              `${this.draft.title} - ${this.draft.author.publisher.name}${Config.PAGE_TITLE_SUFFIX}`
            );
          }
        });

        this.api.retrieveDraftSources(params.id).then((response) => {
          if (response.data) {
            this.sources = response.data;
          }
        });
      },
    });
  }

  public onSourceInput(e: Event, i: number) {
    if (!this.sources) {
      return;
    }

    this.sources[i] = { url: (e.target as HTMLInputElement).value };
  }

  public trackByFn(index: number) {
    return index;
  }

  public async update([success, failure]: ConfirmEventCallback) {
    if (!this.draft) {
      failure();

      return;
    }

    const response = await this.api.updateDraft(this.draft, {
      title: this.updateForm.get('title')?.value,
      content: this.draft.content,
      sources: this.sources,
    });

    this.updateForm.get('title')?.setErrors({
      errors: response.errors?.filter((e) => e.field === 'title'),
    });

    this.updateForm.get('content')?.setErrors({
      errors: response.errors?.filter((e) => e.field === 'content'),
    });

    if (!response.success) {
      failure({
        message: {
          type: 'none',
        },
      });

      return;
    }

    success();

    this.isUpdating = false;

    this.draft = response.data;
  }

  public async submitForVerification() {
    if (!this.draft) {
      return;
    }

    const response = await this.api.submitForVerification(this.draft);

    if (response.success) {
      this.router.navigateByUrl(`/p/${this.draft.author.publisher.id}`);
    }
  }

  public async publish() {
    if (!this.draft) {
      return;
    }

    const response = await this.api.publish(this.draft);

    if (response.success) {
      this.router.navigateByUrl(`/p/${this.draft.author.publisher.id}`);
    }
  }

  public async reject() {
    const reason = this.rejectionReasonTextArea?.nativeElement.value;

    if (!this.draft || !reason) {
      return;
    }

    const response = await this.api.reject(this.draft, { reason });

    if (response.success) {
      this.router.navigateByUrl('/admin/drafts');
    }
  }

  public async delete() {
    if (!this.draft) {
      return;
    }

    const response = await this.api.deleteDraft(this.draft);

    if (response.success) {
      this.router.navigateByUrl(`/p/${this.draft.author.publisher.id}`);
    }
  }
}
