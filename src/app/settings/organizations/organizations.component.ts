import { Component, OnInit } from '@angular/core';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'settings-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit
{
  public organizations?: IOrganization[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .listOrganizationsForUser(this.auth.user.id)
      .then(response =>
      {
        this.organizations = response.data;
      });
  }

  public async deleteOrganization(organization: IOrganization)
  {
    if (!this.organizations)
    {
      return;
    }

    await this.api.deleteOrganization(organization.id);

    this.organizations = this.organizations.filter(_ => _.id !== organization.id);
  }
}
