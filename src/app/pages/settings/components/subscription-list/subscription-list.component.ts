import { Component, Input } from '@angular/core';
import { ISubscription } from 'src/app/services/api/api.service';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'settings-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent
{
  @Input()
  public subscriptions?: ISubscription[];

  constructor(public format: FormatService)
  {}
}
