import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

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

  public async onSubmit(end: () => void)
  {
    if (!this.publisher)
    {
      return;
    }

    const response = await this.api.inviteAuthor(this.publisher.id, {
      email: this.form.get("email")?.value ?? "",
    });

    end();

    if (response.data)
    {
      this.router.navigateByUrl(`/publisher/${this.publisher.id}/authors`);
    }
    else if (response.errors)
    {
      this.form.get("email")?.setErrors({
        errors: response.errors.filter(e => e.field === "email")
      });
    }
  }
}
