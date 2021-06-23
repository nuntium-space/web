import { Component, Input } from '@angular/core';
import { Theme } from 'src/types/Theme';

@Component({
  selector: 'shared-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent
{
  @Input()
  public theme: Theme = "dark";
}
