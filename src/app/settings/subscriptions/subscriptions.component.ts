import { Component } from '@angular/core';
import { ApiService, ISubscription } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'settings-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent
{
  public subscriptions?: {
    active: ISubscription[],
    incomplete: ISubscription[],
    old: ISubscription[],
  };

  constructor(private api: ApiService, private auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listSubscriptionsForUser(auth.user.id).then(response =>
    {
      if (response.data)
      {
        this.subscriptions = {
          active: response.data.filter(s => s.status === "active"),
          /**
           * Incomplete subscriptions are the result of failed payments
           * or payments that require additional steps, such as 3D Secure
           */
          incomplete: response.data.filter(s => s.status !== "active" && !s.deleted),
          old: response.data.filter(s => s.deleted),
        };
      }
    });
  }

  public async manageSubscriptions()
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.createBillingPortalSession(this.auth.user.id);

    if (response.data)
    {
      open(response.data.url, "_blank");
    }
  }
}
