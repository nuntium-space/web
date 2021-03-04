import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent
{
  public changePasswordForm = new FormGroup({
    email: new FormControl(this.auth.user?.email),
    old_password: new FormControl(),
    new_password: new FormControl(),
  });

  constructor(private auth: AuthService)
  {}

  public onChangePasswordFormSubmit(e: Event)
  {
    e.preventDefault();
  }
}
