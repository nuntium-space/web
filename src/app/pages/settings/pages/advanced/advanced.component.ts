import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'settings-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent {
  constructor(private api: ApiService, private auth: AuthService) {}

  public async deleteAccount() {
    if (!this.auth.user) {
      return;
    }

    const response = await this.api.deleteUser(this.auth.user.id);

    if (response.success) {
      await this.auth.signOut();
    }
  }
}
