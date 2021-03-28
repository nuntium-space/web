import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent
{
  public readonly form = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const response = await this.api.createUser({
      first_name: this.form.get("first_name")?.value ?? "",
      last_name: this.form.get("last_name")?.value ?? "",
      email: this.form.get("email")?.value ?? "",
      password: this.form.get("password")?.value ?? "",
    });

    this.form.get("first_name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "first_name")
    });

    this.form.get("last_name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "last_name")
    });

    this.form.get("email")?.setErrors({
      errors: response.errors?.filter(e => e.field === "email")
    });

    this.form.get("password")?.setErrors({
      errors: response.errors?.filter(e => e.field === "password")
    });

    if (response.data)
    {
      this.router.navigateByUrl("/signin");
    }
  }
}
