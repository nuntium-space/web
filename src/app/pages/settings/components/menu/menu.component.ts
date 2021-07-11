import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'settings-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class SettingsMenuComponent {
  @Input('section')
  public section?: string;

  constructor (public auth: AuthService)
  {}
}
