import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IBundle } from 'src/app/services/api/api.service';

@Component({
  selector: 'bundle-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class BundleMenuComponent
{
  @Input("section")
  public section?: string;

  public bundle?: IBundle;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.retrieveBundle(params.id).then(response =>
        {
          this.bundle = response.data;
        });
      },
    });
  }
}
