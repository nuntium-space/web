import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class OrganizationDetailsComponent
{
  public organization?: IOrganization;

  public detailsForm = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.retrieveOrganization(params.id).then(response =>
        {
          this.organization = response.data;

          this.detailsForm.get("name")?.setValue(this.organization?.name);
        });
      },
    });
  }

  public async onDetailsFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.organization)
    {
      return;
    }

    const response = await this.api.updateOrganization(this.organization.id, {
      name: this.detailsForm.get("name")?.value ?? "",
    });

    this.detailsForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });
  }
}
