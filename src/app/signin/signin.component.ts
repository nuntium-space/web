import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService, ISession } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

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

  constructor(private api: ApiService, private auth: AuthService, private router: Router)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const response = await this.api.signInWithEmail(
      this.form.get("email")?.value ?? "",
    );

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

          localStorage.setItem("session.id", session.id);

          this.auth.user = session.user;

          this.router.navigateByUrl("/");
        }
      }, 1000);
    }
  }
}
