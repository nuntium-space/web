import {
  Component,
  Input,
} from '@angular/core';
import { IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'publisher-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input()
  public publisher?: IPublisher;
}
