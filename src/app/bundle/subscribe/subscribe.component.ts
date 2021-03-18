import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
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

    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

    if (stripe)
    {
      const elements = stripe.elements();

      const card = elements.create("card");
      card.mount("#card-element");

      card.on("change", e =>
      {
        console.log(e);
      });
    }
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();
  }
}
