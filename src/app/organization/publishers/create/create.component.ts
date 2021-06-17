import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'organization-publishers-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePublisherComponent
{
  @Input()
  public organization?: IOrganization;

  public form = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.organization)
    {
      failure();

      return;
    }

    const response = await this.api
      .createPublisher(this.organization.id, {
        name: this.form.get("name")?.value ?? "",
        url: this.form.get("url")?.value ?? "",
      });

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.form.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.field === "url")
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

    this.router.navigateByUrl(`/organization/${this.organization.id}/publishers`);
  }
}
