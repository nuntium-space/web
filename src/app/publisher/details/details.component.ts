import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';
import { ConfirmEventCallbackOptions } from 'src/app/shared/components/form/form.component';

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

    this.api
      .retrievePublisher(this.publisher.id)
      .then(response =>
      {
        if (response.data)
        {
          this.publisher = response.data;

          this.detailsForm.get("name")?.setValue(this.publisher.name);
          this.detailsForm.get("url")?.setValue(this.publisher.url);
        }
      });
  }

  public async onDetailsFormSubmit(end: (options?: ConfirmEventCallbackOptions) => void)
  {
    if (!this.publisher)
    {
      end({ success: false });

      return;
    }

    const response = await this.api.updatePublisher(this.publisher.id, {
      name: this.detailsForm.get("name")?.value,
      url: this.detailsForm.get("url")?.value,
    });

    end({
      success: response.success,
      message: {
        type: "none",
      },
    });

    this.detailsForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.detailsForm.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.field === "url")
    });

    if (response.success)
    {
      this.update.emit(response.data);
    }
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

  public async onImageFormSubmit(end: (options?: ConfirmEventCallbackOptions) => void)
  {
    if (!this.publisher)
    {
      end({ success: false });

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

      end({
        success: false,
        message: {
          type: "none",
        },
      });

      return;
    }

    const response = await this.api.updatePublisherImage(this.publisher.id, {
      image: this.image,
    });

    end({
      success: response.success,
      message: {
        type: "none",
      },
    });

    this.imageForm.get("image")?.setErrors({
      errors: response.errors?.filter(e => e.field === "image")
    });

    if (response.success)
    {
      this.publisher.imageUrl = response.data?.url ?? null;

      this.update.emit(this.publisher);
    }
  }
}
