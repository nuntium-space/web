import { Component, Input } from '@angular/core';
import { IOrganization } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'organization-stripe-connect-button',
  templateUrl: './stripe-connect-button.component.html',
  styleUrls: ['./stripe-connect-button.component.scss'],
})
export class StripeConnectButtonComponent {
  @Input()
  public organization?: IOrganization;

  public env = environment;
}
