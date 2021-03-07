import { Component } from '@angular/core';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'user-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class UserPublishersComponent
{
  public publishers?: IPublisher[];

  constructor(api: ApiService, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listPublishersForUser(auth.user.id).then(response =>
    {
      this.publishers = response.data;
    });
  }
}
