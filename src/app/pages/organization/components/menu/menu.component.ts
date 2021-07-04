import { Component, Input } from '@angular/core';
import { IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class OrganizationMenuComponent {
  @Input()
  public organization?: IOrganization;

  @Input()
  public section?: string;
}
