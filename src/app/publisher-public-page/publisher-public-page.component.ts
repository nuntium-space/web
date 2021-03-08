import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(api: ApiService, route: ActivatedRoute)
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
}
