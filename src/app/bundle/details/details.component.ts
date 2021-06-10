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
  public update = new EventEmitter<IBundle>();

  public form = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    this.form.get("name")?.setValue(this.bundle?.name);
  }

  public async onSubmit(end: () => void)
  {
    if (!this.bundle)
    {
      return;
    }

    const response = await this.api.updateBundle(this.bundle.id, {
      name: this.form.get("name")?.value,
    });

    end();

    Object.entries(this.form.controls).forEach(([ name, control ]) =>
    {
      control.setErrors({
        errors: response.errors?.filter(e => e.field === name)
      });
    });

    if (response.success)
    {
      this.update.emit(response.data);
    }
  }
}
