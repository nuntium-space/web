import { Component } from '@angular/core';
import { ApiService, ISubscription } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent
{
  public subscriptions: {
    active: ISubscription[],
    inactive: ISubscription[],
    old: ISubscription[],
  } = {
    active: [],
    inactive: [],
    old: [],
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
        this.subscriptions.active = response.data.filter(s => s.status === "active");

        this.subscriptions.old = response.data.filter(s => s.canceled_at !== null);

        /**
         * Inactive subscriptions are subscriptions with status !== `active` (obviously)
         * but that are still not canceled (canceled_at !== `null`), they are the result
         * of failed payments or payments that require additional steps, such as 3D Secure
         */
        this.subscriptions.inactive = response.data.filter(s =>
        {
          return !this.subscriptions.active.find(activeSubscription => activeSubscription.id === s.id)
            && !this.subscriptions.old.find(oldSubscription => oldSubscription.id === s.id);
        });
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
      open(response.data.url, "_target");
    }
  }
}
