import { Component, Input } from '@angular/core';

@Component({
  selector: 'feeds-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent
{
  @Input()
  public section?: string;
}
