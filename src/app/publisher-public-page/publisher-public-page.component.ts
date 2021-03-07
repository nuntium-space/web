import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPublisher } from '../services/api/api.service';

@Component({
  selector: 'app-publisher-public-page',
  templateUrl: './publisher-public-page.component.html',
  styleUrls: ['./publisher-public-page.component.scss']
})
export class PublisherPublicPageComponent
{
  public publisher?: IPublisher;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api.retrievePublisher(route.snapshot.url[0].path.replace("~", "")).then(response =>
    {
      this.publisher = response.data;
    });
  }
}
