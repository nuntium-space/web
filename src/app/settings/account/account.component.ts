import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent
{
  public updateAccountDetailsForm = new FormGroup({
    first_name: new FormControl(this.auth.user?.first_name),
    last_name: new FormControl(this.auth.user?.last_name),
    email: new FormControl(this.auth.user?.email),
  });

  constructor(private auth: AuthService)
  {}

  public onUpdateAccountDetailsFormSubmit(e: Event)
  {
    e.preventDefault();
  }
}
