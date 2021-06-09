import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AccountDetailsComponent
{
  public updateAccountDetailsForm = new FormGroup({
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
      username: this.updateAccountDetailsForm.get("username")?.value ?? "",
      email: this.updateAccountDetailsForm.get("email")?.value ?? "",
    });

    end();

    this.updateAccountDetailsForm.get("username")?.setErrors({
      errors: response.errors?.filter(e => e.field === "username")
    });

    this.updateAccountDetailsForm.get("email")?.setErrors({
      errors: response.errors?.filter(e => e.field === "email")
    });
  }
}
