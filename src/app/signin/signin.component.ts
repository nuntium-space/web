import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { UserSettingsService } from '../shared/services/user-settings/user-settings.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
{
  public readonly form = new FormGroup({
    email: new FormControl(),
  });

  public showEmailSignInSuccessMessage = false;

  constructor(private api: ApiService, private auth: AuthService, private translate: TranslateService, private userSettings: UserSettingsService, private router: Router)
  {}

  public async onSubmit(end: () => void)
  {
    const response = await this.api.signInWithEmail(
      this.form.get("email")?.value ?? "",
    );

    end();

    this.form.get("email")?.setErrors({
      errors: response.errors?.filter(e => e.field === "email")
    });

    const { data } = response;

    if (data)
    {
      this.showEmailSignInSuccessMessage = true;

      const interval = setInterval(async () =>
      {
        const signInRequestResponse = await this.api.retrieveSignInRequest(data.id);

        if (signInRequestResponse.status === 403)
        {
          clearInterval(interval);

          return;
        }

        const session = signInRequestResponse.data?.session;

        if (session)
        {
          clearInterval(interval);

          this.auth.user = session.user;

          const userSettings = await this.userSettings.init();

          const language = userSettings?.language ?? this.translate.getBrowserLang();

          this.translate.use(language);

          this.router.navigateByUrl("/");
        }
      }, 1000);
    }
  }
}
