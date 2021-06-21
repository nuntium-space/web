import { Component, OnInit } from '@angular/core';
import { IAuthorInvite } from 'src/app/publisher/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'settings-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit
{
  public invites?: IAuthorInvite[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .retrieveInvites(this.auth.user.id)
      .then(response =>
      {
        this.invites = response.data;
      });
  }

  public async accept(invite: IAuthorInvite)
  {
    if (!this.invites)
    {
      return;
    }

    await this.api.acceptInvite(invite.id);

    this.invites = this.invites.filter(_ => _.id !== invite.id);
  }
}
