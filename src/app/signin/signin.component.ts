import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Nes from '@hapi/nes';
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

    if (response.data)
    {
      // TODO: Show success message to user

      const client = new Nes.Client(environment.websocket.endpoint);

      await client.connect();

      client.subscribe(`/auth/email/requests/${response.data.id}`, (message, flags) =>
      {
        const session = message.session as ISession | undefined;

        if (session)
        {
          localStorage.setItem("session.id", session.id);

          this.auth.user = session.user;

          this.router.navigateByUrl("/");
        }
      });
    }
  }
}
