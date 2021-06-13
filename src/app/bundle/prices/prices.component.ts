import { Component, Input, OnChanges } from '@angular/core';
import { ApiService, IBundle, IPrice } from 'src/app/services/api/api.service';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'bundle-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnChanges
{
  @Input()
  public bundle?: IBundle;

  public prices?: IPrice[];

  constructor(public format: FormatService, private api: ApiService)
  {}

  public ngOnChanges()
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

  public async archiveOrRestorePrice(price: IPrice)
  {
    if (!this.prices)
    {
      return;
    }

    const { success } = await this.api.updatePrice(price.id, { active: !price.active });

    if (success)
    {
      this.prices = this.prices.map(_ =>
      {
        if (_.id === price.id)
        {
          _.active = !price.active;
        }

        return _;
      });
    }
  }
}
