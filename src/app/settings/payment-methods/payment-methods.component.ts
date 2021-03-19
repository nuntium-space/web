import { Component } from '@angular/core';
import { ApiService, IPaymentMethod } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent
{
  public paymentMethods?: IPaymentMethod[];

  constructor(api: ApiService, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listPaymentMethodsForUser(auth.user.id).then(response =>
    {
      this.paymentMethods = response.data;
    });
  }
}
