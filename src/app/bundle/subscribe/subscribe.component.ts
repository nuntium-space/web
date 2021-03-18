import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IBundle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent
{
  public bundle?: IBundle;

  constructor(private api: ApiService, private auth: AuthService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.retrieveBundle(params.id).then(response =>
        {
          this.bundle = response.data;
        });
      },
    });
  }

  public async onDetailsFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user || !this.bundle)
    {
      return;
    }

    const response = await this.api.subscribeToBundle(this.auth.user.id, this.bundle.id);

    if (response.data)
    {
      console.log(response.data);
    }
  }
}
