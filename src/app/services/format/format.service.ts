import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService
{
  constructor()
  {}

  public currency(amount: number, currency: string): string
  {
    if ([ "usd", "eur" ].includes(currency.toLowerCase()))
    {
      amount /= 100;
    }

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  }
}
