import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent
{
  public section: string;

  public updateAccountDetailsForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private router: Router)
  {
    this.section = "account";

    this.section = router.url.split("/").pop() as string;

    if (this.section === "settings") this.section = "account";
  }

  public setSection(section: string)
  {
    this.section = section;

    this.router.navigateByUrl(`/settings/${section}`);
  }

  public onUpdateAccountDetailsFormSubmit(e: Event)
  {
    e.preventDefault();
  }
}
