import { Component, Input, OnInit } from '@angular/core';
import { ApiService, IBundle, IPrice } from 'src/app/services/api/api.service';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'bundle-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit
{
  @Input()
  public bundle?: IBundle;

  public prices?: IPrice[];

  constructor(public format: FormatService, private api: ApiService)
  {}

  public ngOnInit()
  {
    if (!this.bundle)
    {
      return;
    }

    this.api
      .listPricesForBundle(this.bundle.id)
      .then(response =>
      {
        this.prices = response.data;
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
