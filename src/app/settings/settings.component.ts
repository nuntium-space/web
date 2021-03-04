import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent
{
  public section: string;

  constructor(private router: Router)
  {
    this.section = "account";

    this.section = router.url.split("/").pop() as string;

    if (this.section === "settings") this.section = "account";
  }

  setSection(section: string)
  {
    this.section = section;

    this.router.navigateByUrl(`/settings/${section}`);
  }
}
