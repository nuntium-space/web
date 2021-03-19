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

  constructor(private api: ApiService, auth: AuthService)
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

  public async removePaymentMethod(paymentMethod: IPaymentMethod)
  {
    if (!this.paymentMethods)
    {
      return;
    }

    const response = await this.api.deletePaymentMethod(paymentMethod.id);

    if (!response.errors)
    {
      this.paymentMethods = this.paymentMethods.filter(p => p.id !== paymentMethod.id);
    }
  }
}
