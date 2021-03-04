import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
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

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async onChangePasswordFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.updateUser(this.auth.user.id, {
      old_password: this.changePasswordForm.get("old_password")?.value ?? "",
      new_password: this.changePasswordForm.get("new_password")?.value ?? "",
    });

    this.changePasswordForm.get("old_password")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"old_password"`))
    });

    this.changePasswordForm.get("new_password")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"new_password"`))
    });

    if (response.data)
    {
      this.changePasswordForm.reset();
    }
  }
}
