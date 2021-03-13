import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from 'src/config';
import { ApiService, IArticle, IPublisher } from '../services/api/api.service';

@Component({
  selector: 'app-publisher-public-page',
  templateUrl: './publisher-public-page.component.html',
  styleUrls: ['./publisher-public-page.component.scss']
})
export class PublisherPublicPageComponent
{
  public publisher?: IPublisher;

  public articles?: IArticle[];

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.url.subscribe({
      next: url =>
      {
        const publisherId = url[0].path.replace("~", "");

        api.retrievePublisher(publisherId).then(response =>
        {
          this.publisher = response.data;
        });

        api.listArticlesForPublisher(publisherId).then(response =>
        {
          this.articles = response.data;
        });
      },
    });
  }

  public async onSubscribeClick()
  {
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

    if (!stripe)
    {
      return;
    }

    // TODO: Load all bundles for this publisher

    const response = await this.api.createCheckoutSessionForBundle("TODO");

    if (response.data)
    {
      stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    }
  }
}
