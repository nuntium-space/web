import { Component, Input } from '@angular/core';
import { IOrganization } from 'src/app/services/api/api.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'organization-stripe-connect-button',
  templateUrl: './stripe-connect-button.component.html',
  styleUrls: ['./stripe-connect-button.component.scss']
})
export class StripeConnectButtonComponent
{
  @Input()
  public organization?: IOrganization;

  constructor(private api: ApiService)
  {}

  public async goToDashboard()
  {
    if (!this.organization)
    {
      return;
    }

    const response = await this.api.createSignInLinkForStripeDashboard(this.organization.id);

    if (response.data)
    {
      open(response.data.url, "_blank");
    }
  }

  public async connect()
  {
    if (!this.organization)
    {
      return;
    }

    const response = await this.api.connectAccount(this.organization.id);

    if (response.data)
    {
      open(response.data.url, "_blank");
    }
  }
}
