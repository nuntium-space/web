import { Component } from '@angular/core';
import { IAuthor } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'settings-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class UserPublishersComponent
{
  public authors?: IAuthor[];

  constructor(api: ApiService, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listAuthorsForUser(auth.user.id).then(response =>
    {
      this.authors = response.data;
    });
  }
}
