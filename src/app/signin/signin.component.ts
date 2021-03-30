import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
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

    const response = await this.api.createSession(
      this.form.get("email")?.value ?? "",
    );

    this.form.get("email")?.setErrors({
      errors: response.errors?.filter(e => e.field === "email")
    });

    if (response.data)
    {
      localStorage.setItem("session.id", response.data.id);

      this.auth.user = response.data.user;

      this.router.navigateByUrl("/");
    }
  }
}
