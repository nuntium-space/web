import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent
{
  constructor(private api: ApiService, private auth: AuthService, private router: Router)
  {}

  public async deleteAccount()
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.deleteUser(this.auth.user.id);

    if (!response.errors)
    {
      await this.auth.signOut();
    }
  }
}
