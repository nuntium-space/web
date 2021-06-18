import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';
import { ApiService } from '../../services/api/api.service';

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

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    const response = await this.api
      .createOrganization({
        name: this.form.get("name")?.value ?? "",
      });

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    if (!response.success)
    {
      failure({
        message: {
          type: "none",
        },
      });

      return;
    }

    success();

    this.router.navigateByUrl("/settings/organizations");
  }
}
