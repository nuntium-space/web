import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'add-payment-method',
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

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.stripe || !this.cardElement || !this.auth.user)
    {
      return;
    }

    const result = await this.stripe
      .createPaymentMethod({
        type: "card",
        card: this.cardElement,
      });

    if (result.error)
    {
      return;
    }

    const response = await this.api.addPaymentMethodToUser(this.auth.user.id, {
      id: result.paymentMethod.id,
    });

    if (!response.errors)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
