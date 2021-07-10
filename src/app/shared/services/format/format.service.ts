import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  constructor(private translate: TranslateService) {}

  public dateTime(
    value: string,
    format: 'date' | 'datetime' | 'shortdate'
  ): string {
    let options: Intl.DateTimeFormatOptions;

    switch (format) {
      case 'date': {
        options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        };

        break;
      }
      case 'datetime': {
        options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };

        break;
      }
      case 'shortdate': {
        options = {
          month: 'short',
          day: '2-digit',
        };

        break;
      }
    }

    return new Intl.DateTimeFormat(this.translate.currentLang, options).format(
      new Date(value)
    );
  }

  public currency(amount: number, currency: string): string {
    if (['usd', 'eur'].includes(currency.toLowerCase())) {
      amount /= 100;
    }

    return new Intl.NumberFormat(this.translate.currentLang, {
      style: 'currency',
      currency: currency.toUpperCase(),
      currencyDisplay: "narrowSymbol",
    }).format(amount);
  }
}
