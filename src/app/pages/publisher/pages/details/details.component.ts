import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPublisher } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'publisher-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class PublisherDetailsComponent implements OnChanges
{
  @Input()
  public publisher?: IPublisher;

  @Output()
  public update = new EventEmitter<IPublisher>();

  private image?: File;

  public detailsForm = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
  });

  public imageForm = new FormGroup({
    image: new FormControl(),
  });

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.publisher)
    {
      return;
    }

    this.detailsForm.get("name")?.setValue(this.publisher.name);
    this.detailsForm.get("url")?.setValue(this.publisher.url);
  }

  public async onDetailsFormSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.publisher)
    {
      failure();

      return;
    }

    const response = await this.api.updatePublisher(this.publisher.id, {
      name: this.detailsForm.get("name")?.value,
      url: this.detailsForm.get("url")?.value,
    });

    this.detailsForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.detailsForm.get("url")?.setErrors({
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

    this.update.emit(response.data);
  }

  public onImageChange(e: Event)
  {
    this.image = undefined;

    if (e.target instanceof HTMLInputElement)
    {
      const file = e.target.files?.item(0);

      this.image = file ?? undefined;
    }
  }

  public async onImageFormSubmit([ success, failure ]: ConfirmEventCallback)
  {
    if (!this.publisher)
    {
      failure();

      return;
    }

    if (!this.image)
    {
      this.imageForm.get("image")?.setErrors({
        errors: [
          {
            field: "image",
            error: "errors.publisher.details.image.required",
          },
        ],
      });

      failure({
        message: {
          type: "none",
        },
      });

      return;
    }

    const response = await this.api.updatePublisherImage(this.publisher.id, {
      image: this.image,
    });

    this.imageForm.get("image")?.setErrors({
      errors: response.errors?.filter(e => e.field === "image")
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

    this.publisher.imageUrl = response.data.url;

    this.update.emit(this.publisher);
  }
}
