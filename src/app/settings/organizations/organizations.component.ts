import { Component } from '@angular/core';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent
{
  public organizations?: IOrganization[];

  constructor(api: ApiService, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listOrganizationsForUser(auth.user.id).then(response =>
    {
      this.organizations = response.data;
    });
  }
}
