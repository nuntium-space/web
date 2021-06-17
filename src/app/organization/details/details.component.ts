import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'organization-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class OrganizationDetailsComponent implements OnChanges
{
  @Input()
  public organization?: IOrganization;

  @Output()
  public update = new EventEmitter<IOrganization>();

  public detailsForm = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.organization)
    {
      return;
    }

    this.api
      .retrieveOrganization(this.organization.id)
      .then(response =>
      {
        this.organization = response.data;

        this.detailsForm.get("name")?.setValue(this.organization?.name);
      });
  }

  public async onDetailsFormSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.organization)
    {
      failure();

      return;
    }

    const response = await this.api.updateOrganization(this.organization.id, {
      name: this.detailsForm.get("name")?.value ?? "",
    });

    this.detailsForm.get("name")?.setErrors({
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

    this.update.emit(response.data);
  }
}
