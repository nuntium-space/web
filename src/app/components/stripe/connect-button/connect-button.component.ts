import { Component, Input } from '@angular/core';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'stripe-connect-button',
  templateUrl: './connect-button.component.html',
  styleUrls: ['./connect-button.component.scss']
})
export class StripeConnectButtonComponent
{
  @Input()
  public organization?: IOrganization;

  constructor(private api: ApiService)
  {}

  public async onClick()
  {
    if (!this.organization)
    {
      return;
    }

    const response = await this.api.connectAccount(this.organization.id);

    if (response.data)
    {
      open(response.data.url, "_target");
    }
  }
}
