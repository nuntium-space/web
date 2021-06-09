import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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

  @Output()
  public onUpdate = new EventEmitter<IBundle>();

  public form = new FormGroup({
    name: new FormControl(),
  });

  public isLoading = false;

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    this.form.get("name")?.setValue(this.bundle?.name);
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.bundle)
    {
      return;
    }

    this.isLoading = true;

    const response = await this.api.updateBundle(this.bundle.id, {
      name: this.form.get("name")?.value,
    });

    this.isLoading = false;

    Object.entries(this.form.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });

    if (response.success)
    {
      this.onUpdate.emit(response.data);
    }
  }
}
