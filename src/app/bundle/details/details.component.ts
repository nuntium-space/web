import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, IBundle } from 'src/app/services/api/api.service';

@Component({
  selector: 'bundle-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class BundleDetailsComponent implements OnChanges
{
  @Input()
  public bundle?: IBundle;

  public detailsForm = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    this.detailsForm.get("name")?.setValue(this.bundle?.name);
  }

  public async onDetailsFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.bundle)
    {
      return;
    }

    const response = await this.api.updateBundle(this.bundle.id, {
      name: this.detailsForm.get("name")?.value,
    });

    this.detailsForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });
  }
}
