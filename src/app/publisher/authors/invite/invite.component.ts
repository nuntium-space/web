import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteAuthorComponent
{
  private publisherId?: string;

  public form = new FormGroup({
    email: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        this.publisherId = params.id;
      },
    });
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.publisherId)
    {
      return;
    }

    const response = await this.api.inviteAuthor(this.publisherId, {
      email: this.form.get("email")?.value ?? "",
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/publisher/${this.publisherId}/authors`);
    }
    else if (response.errors)
    {
      this.form.get("email")?.setErrors({
        errors: response.errors.filter(e => e.startsWith(`"email"`))
      });
    }
  }
}
