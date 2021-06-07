import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent
{
  @Input()
  public text = "";
}