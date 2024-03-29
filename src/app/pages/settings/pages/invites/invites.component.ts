import { Component, OnInit } from '@angular/core';
import { IAuthorInvite } from 'src/app/pages/publisher/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'settings-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss'],
})
export class InvitesComponent implements OnInit {
  public invites?: IAuthorInvite[];

  constructor(
    public format: FormatService,
    private api: ApiService,
    private auth: AuthService
  ) {}

  public ngOnInit() {
    if (!this.auth.user) {
      return;
    }

    this.api.retrieveInvites(this.auth.user).then((response) => {
      this.invites = response.data;
    });
  }

  public async accept(
    invite: IAuthorInvite,
    [success, failure]: ConfirmEventCallback
  ) {
    if (!this.invites) {
      failure();

      return;
    }

    const response = await this.api.acceptInvite(invite);

    if (!response.success) {
      failure({
        message: {
          text: response.errors?.[0].error,
        },
      });

      return;
    }

    success();

    this.invites = this.invites.filter((_) => _.id !== invite.id);
  }
}
