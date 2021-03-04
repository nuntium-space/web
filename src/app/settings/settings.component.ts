import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent
{
  public section: string;

  public updateAccountDetailsForm = new FormGroup({
    first_name: new FormControl(this.auth.user?.first_name),
    last_name: new FormControl(this.auth.user?.last_name),
    email: new FormControl(this.auth.user?.email),
  });

  constructor(private auth: AuthService, private router: Router)
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
