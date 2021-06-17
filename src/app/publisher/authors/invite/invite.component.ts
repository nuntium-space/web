import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'publisher-authors-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteAuthorComponent
{
  @Input()
  public publisher?: IPublisher;

  public form = new FormGroup({
    email: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.publisher)
    {
      failure();

      return;
    }

    const response = await this.api
      .inviteAuthor(this.publisher.id, {
        email: this.form.get("email")?.value ?? "",
      });

    this.form.get("email")?.setErrors({
      errors: response.errors?.filter(e => e.field === "email")
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

    this.router.navigateByUrl(`/publisher/${this.publisher.id}/authors`);
  }
}
