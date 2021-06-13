import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sign-in-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent
{
  public endpoint = environment.api.endpoint;
}
