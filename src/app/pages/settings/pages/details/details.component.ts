import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Utilities } from 'src/utilities/Utilities';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'settings-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class AccountDetailsComponent {
  public updateAccountDetailsForm = new FormGroup({
    fullName: new FormControl(this.auth.user?.full_name),
    email: new FormControl(this.auth.user?.email),
  });

  constructor(private api: ApiService, private auth: AuthService) {}

  public async onUpdateAccountDetailsFormSubmit([
    success,
    failure,
  ]: ConfirmEventCallback) {
    if (!this.auth.user) {
      failure();

      return;
    }

    const response = await this.api.updateUser(this.auth.user.id, {
      full_name: Utilities.getFormControlValue(
        this.updateAccountDetailsForm.get('fullName')
      ),
      email: Utilities.getFormControlValue(
        this.updateAccountDetailsForm.get('email')
      ),
    });

    Object.entries(this.updateAccountDetailsForm.controls).forEach(
      ([name, control]) => {
        control.setErrors({
          errors: response.errors?.filter((e) => e.field === name),
        });
      }
    );

    if (!response.success) {
      failure({
        message: {
          type: 'none',
        },
      });

      return;
    }

    success();
  }
}
