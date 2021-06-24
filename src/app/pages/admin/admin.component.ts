import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent
{
  constructor(auth: AuthService, router: Router)
  {
    if (auth.user?.type !== "admin")
    {
      router.navigateByUrl("/");
    }
  }
}
