import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IBundle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit
{
  public bundle?: IBundle;

  constructor(public auth: AuthService, private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async ngOnInit(): Promise<void>
  {
    this.route.params.subscribe({
      next: params =>
      {
        this.api.retrieveBundle(params.id).then(response =>
        {
          this.bundle = response.data;
        });
      },
    });
  }

  public async subscribe()
  {
    if (!this.auth.user || !this.bundle)
    {
      return;
    }

    const response = await this.api.subscribeToBundle(this.auth.user.id, this.bundle.id);

    if (!response.errors)
    {
      this.router.navigateByUrl("/");
    }
  }
}
