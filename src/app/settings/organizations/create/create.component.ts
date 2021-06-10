import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'settings-organizations-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateOrganizationComponent
{
  public form = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit(end: () => void)
  {
    const response = await this.api.createOrganization({
      name: this.form.get("name")?.value ?? "",
    });

    end();

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    if (response.data)
    {
      this.router.navigateByUrl("/settings/organizations");
    }
  }
}
