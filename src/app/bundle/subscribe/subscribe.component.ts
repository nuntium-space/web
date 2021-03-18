import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { ApiService, IBundle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { STRIPE_PUBLISHABLE_KEY } from 'src/config';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit
{
  private stripe: Stripe | null = null;

  private cardElement?: StripeCardElement;

  public cardElementError: string = "";

  public bundle?: IBundle;

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute)
  {}

  public async ngOnInit(): Promise<void>
  {
    this.route.params.subscribe({
      next: params =>
      {
        this.api.retrieveBundle(params.id).then(response =>
        {
          this.bundle = response.data;
        });
      },
    });

    this.stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

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

    if (!this.stripe || !this.cardElement || !this.auth.user || !this.bundle)
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
      console.log(result.error);

      return;
    }

    const response = await this.api.subscribeToBundle(this.auth.user.id, this.bundle.id);

    if (response.data)
    {
      console.log(response.data);
    }
  }
}
