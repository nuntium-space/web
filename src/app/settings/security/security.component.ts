import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent
{
  public changePasswordForm = new FormGroup({
    old_password: new FormControl(),
    new_password: new FormControl(),
  });

  constructor()
  {}

  public onChangePasswordFormSubmit(e: Event)
  {
    e.preventDefault();
  }
}
