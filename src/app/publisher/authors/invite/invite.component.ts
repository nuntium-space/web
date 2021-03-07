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
  public form = new FormGroup({
    email: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const publisherId = this.route.snapshot.params.id;

    const response = await this.api.inviteAuthor(publisherId, {
      email: this.form.get("email")?.value ?? "",
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/publisher/${publisherId}/authors`);
    }
    else if (response.errors)
    {
      this.form.get("email")?.setErrors({
        errors: response.errors.filter(e => e.startsWith(`"email"`))
      });
    }
  }
}
