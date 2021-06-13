import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Utilities } from 'src/utilities/Utilities';

@Component({
  selector: 'settings-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AccountDetailsComponent
{
  public updateAccountDetailsForm = new FormGroup({
    fullName: new FormControl(this.auth.user?.full_name),
    username: new FormControl(this.auth.user?.username),
    email: new FormControl(this.auth.user?.email),
  });

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async onUpdateAccountDetailsFormSubmit(end: () => void)
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.updateUser(this.auth.user.id, {
      full_name: Utilities.getFormControlValue(this.updateAccountDetailsForm.get("fullName")),
      username: Utilities.getFormControlValue(this.updateAccountDetailsForm.get("username")),
      email: Utilities.getFormControlValue(this.updateAccountDetailsForm.get("email")),
    });

    end();

    Object.entries(this.updateAccountDetailsForm.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });
  }
}
