import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from 'src/config';
import { ApiService, IArticle, IBundle, IPublisher } from '../services/api/api.service';

@Component({
  selector: 'app-publisher-public-page',
  templateUrl: './publisher-public-page.component.html',
  styleUrls: ['./publisher-public-page.component.scss']
})
export class PublisherPublicPageComponent
{
  public publisher?: IPublisher;

  public articles?: IArticle[];

  public bundles?: IBundle[];

  public showBundleList = false;

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

        api.listBundlesForPublisher(publisherId).then(response =>
        {
          this.bundles = response.data;
        });
      },
    });
  }

  public async onBundleSelected(bundle: IBundle)
  {
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

    if (!stripe)
    {
      return;
    }

    const response = await this.api.createCheckoutSessionForBundle(bundle.id);

    if (response.data)
    {
      stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    }
  }
}
