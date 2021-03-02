import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
{
  public readonly form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private api: ApiService)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const response = await this.api.createSession(
      this.form.get("email")?.value,
      this.form.get("password")?.value,
    );

    console.log(response);
  }
}
