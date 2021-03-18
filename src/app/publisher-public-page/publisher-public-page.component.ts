import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IArticle, IBundle, IPublisher } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

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

  constructor(public auth: AuthService, api: ApiService, route: ActivatedRoute)
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
}
