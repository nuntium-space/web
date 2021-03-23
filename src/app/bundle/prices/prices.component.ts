import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPrice } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent
{
  public prices?: IPrice[];

  constructor(private api: ApiService, route: ActivatedRoute)
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

  public formatAmount(price: IPrice): string
  {
    let amount = price.amount;

    if ([ "usd", "eur" ].includes(price.currency))
    {
      amount /= 100;
    }

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: price.currency.toUpperCase(),
    }).format(amount);
  }

  public async removePrice(price: IPrice)
  {
    if (!this.prices)
    {
      return;
    }

    const response = await this.api.deletePrice(price.id);

    if (!response.errors)
    {
      this.prices = this.prices.filter(p => p.id !== price.id);
    }
  }
}
