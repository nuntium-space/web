import { Component, Input } from '@angular/core';
import { IBundle } from 'src/app/services/api/api.service';

@Component({
  selector: 'bundle-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class BundleMenuComponent
{
  @Input()
  public bundle?: IBundle;

  @Input()
  public section?: string;
}
