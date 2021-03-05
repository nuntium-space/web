import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePublisherComponent
{
  public createNewPublisherForm = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onCreateNewPublisherFormSubmit(e: Event)
  {
    e.preventDefault();

    const response = await this.api.createPublisher({
      name: this.createNewPublisherForm.get("name")?.value ?? "",
    });

    this.createNewPublisherForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"name"`))
    });

    if (response.data)
    {
      this.router.navigateByUrl("/organization/TODO/publishers");
    }
  }
}
