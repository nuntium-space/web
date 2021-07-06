import { Component } from '@angular/core';
import { ISubscription } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'settings-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent {
  public env = environment;

  public subscriptions?: {
    active: ISubscription[];
    incomplete: ISubscription[];
    old: ISubscription[];
  };

  constructor(api: ApiService, public auth: AuthService) {
    if (!auth.user) {
      return;
    }

    api.listSubscriptionsForUser(auth.user.id).then((response) => {
      if (response.data) {
        this.subscriptions = {
          active: response.data.filter((s) => s.status === 'active'),
          /**
           * Incomplete subscriptions are the result of failed payments
           * or payments that require additional steps, such as 3D Secure
           */
          incomplete: response.data.filter(
            (s) => s.status !== 'active' && !s.deleted
          ),
          old: response.data.filter((s) => s.deleted),
        };
      }
    });
  }
}
