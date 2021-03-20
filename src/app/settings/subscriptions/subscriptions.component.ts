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
  } = {
    active: [],
    inactive: [],
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
        this.subscriptions.inactive = response.data.filter(s => s.status !== "active");
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
