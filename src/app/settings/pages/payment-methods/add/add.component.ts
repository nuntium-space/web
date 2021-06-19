import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'settings-payment-methods-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPaymentMethodComponent implements OnInit
{
  private stripe: Stripe | null = null;

  private cardElement?: StripeCardElement;

  public cardElementError: string = "";

  constructor(private api: ApiService, private auth: AuthService, private translate: TranslateService, private router: Router, private route: ActivatedRoute)
  {}

  public async ngOnInit(): Promise<void>
  {
    this.stripe = await loadStripe(environment.stripePublishableKey, {
      locale: this.translate.currentLang as any,
    });

    if (this.stripe)
    {
      const elements = this.stripe.elements();

      this.cardElement = elements.create("card");

      this.cardElement.mount("#card-element");

      this.cardElement.on("change", e =>
      {
        this.cardElementError = e.error?.message ?? "";
      });
    }
  }

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.stripe || !this.cardElement || !this.auth.user)
    {
      failure();

      return;
    }

    const result = await this.stripe
      .createPaymentMethod({
        type: "card",
        card: this.cardElement,
      });

    if (result.error)
    {
      failure();

      return;
    }

    const response = await this.api.addPaymentMethodToUser(this.auth.user.id, {
      id: result.paymentMethod.id,
    });

    if (!response.success)
    {
      failure({
        message: {
          type: "none",
        },
      });

      return;
    }

    success();

    this.router.navigate([ "payment-methods" ], {
      /*
        this.route is the empty path route in settings-routing.module.ts
        so, in order to navigate to the payment-methods section we need
        to navigate relative to the settings route defined in app-routing.module.ts

        This sucks but it's the best way (that wasn't absolute) to do this kind of navigation I've found
        so far.
      */
      relativeTo: this.route.parent,
    });
  }
}
