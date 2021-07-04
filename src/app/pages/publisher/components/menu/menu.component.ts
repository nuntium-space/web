import { Component, Input } from '@angular/core';
import { IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'publisher-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class PublisherMenuComponent {
  @Input()
  public publisher?: IPublisher;

  @Input()
  public section?: string;
}
