import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
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

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async onUpdateAccountDetailsFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.updateUser(this.auth.user.id, {
      first_name: this.updateAccountDetailsForm.get("first_name")?.value ?? "",
      last_name: this.updateAccountDetailsForm.get("last_name")?.value ?? "",
      email: this.updateAccountDetailsForm.get("email")?.value ?? "",
    });

    this.updateAccountDetailsForm.get("first_name")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"first_name"`))
    });

    this.updateAccountDetailsForm.get("last_name")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"last_name"`))
    });

    this.updateAccountDetailsForm.get("email")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"email"`))
    });
  }
}
