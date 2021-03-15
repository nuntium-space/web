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
  public subscriptions?: ISubscription[];

  constructor(api: ApiService, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listSubscriptionsForUser(auth.user.id).then(response =>
    {
      this.subscriptions = response.data;
    });
  }
}
