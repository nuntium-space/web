import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService, IAccount } from '../../services/api/api.service';

@Component({
  selector: 'settings-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  public readonly env = environment;

  public accounts?: IAccount[];

  constructor(public auth: AuthService, private api: ApiService) {}

  public ngOnInit() {
    if (!this.auth.user) {
      return;
    }

    this.api.retrieveLinkedAccounts(this.auth.user).then((response) => {
      if (response.success) {
        this.accounts = response.data;
      }
    });
  }

  public async unlinkAccount(account: IAccount) {
    if (!this.auth.user || !this.accounts) {
      return;
    }

    const { success } = await this.api.unlinkAccount(this.auth.user, account);

    if (success) {
      this.accounts.map((_) => {
        if (_.id === account.id) {
          _.is_linked = false;
        }

        return _;
      });
    }
  }
}
