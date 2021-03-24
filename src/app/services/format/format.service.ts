import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService
{
  constructor(@Inject(LOCALE_ID) private locale: string)
  {}

  public currency(amount: number, currency: string): string
  {
    if ([ "usd", "eur" ].includes(currency.toLowerCase()))
    {
      amount /= 100;
    }

    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  }
}
