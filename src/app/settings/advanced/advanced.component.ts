import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent
{
  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async deleteAccount()
  {
    if (!this.auth.user)
    {
      return;
    }

    // TODO
  }
}
