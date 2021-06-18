import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBundle } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
import { Config } from 'src/config/Config';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'bundle-prices-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPriceComponent
{
  @Input()
  public bundle?: IBundle;

  public currencies = Config.CURRENCIES;

  public form = new FormGroup({
    amount: new FormControl(),
    currency: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.bundle)
    {
      failure();

      return;
    }

    let amount: number = this.form.get("amount")?.value ?? -1;
    const currency = this.form.get("currency")?.value ?? "";

    if ([ "usd", "eur" ].includes(currency))
    {
      amount = parseInt(amount.toFixed(2).replace(".", ""));
    }

    const response = await this.api
      .createPrice(this.bundle.id, {
        amount: Math.trunc(amount),
        currency,
      });

    this.form.get("amount")?.setErrors({
      errors: response.errors?.filter(e => e.field === "amount")
    });

    this.form.get("currency")?.setErrors({
      errors: response.errors?.filter(e => e.field === "currency")
    });

    if (!response.success)
    {
      failure({
        message: {
          type: "none",
        },
      });

      return;
    }

    success();

    this.router.navigate([ "prices" ], {
      relativeTo: this.route.parent,
    });
  }
}
