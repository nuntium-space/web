import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sign-in-buttons',
  templateUrl: './sign-in-buttons.component.html',
  styleUrls: ['./sign-in-buttons.component.scss']
})
export class SignInButtonsComponent
{
  public endpoint = environment.api.endpoint;

  constructor()
  {}
}
