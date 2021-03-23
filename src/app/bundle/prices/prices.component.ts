import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPrice } from 'src/app/services/api/api.service';
import { FormatService } from 'src/app/services/format/format.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent
{
  public prices?: IPrice[];

  constructor(public format: FormatService, private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.listPricesForBundle(params.id).then(response =>
        {
          this.prices = response.data;
        });
      },
    });
  }

  public async archivePrice(price: IPrice)
  {
    if (!this.prices)
    {
      return;
    }

    const response = await this.api.deletePrice(price.id);

    if (!response.errors)
    {
      this.prices.map(p =>
      {
        if (p.id === price.id)
        {
          p.active = false;
        }

        return p;
      });
    }
  }
}
