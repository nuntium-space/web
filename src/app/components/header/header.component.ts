import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent
{
  public searchQuery: string = "";

  public showNav = false;

  constructor(public auth: AuthService, public router: Router, private route: ActivatedRoute)
  {
    route.queryParams.subscribe({
      next: queryParams =>
      {
        this.searchQuery = queryParams.query ?? "";
      },
    });
  }

  public onSearch(e: Event)
  {
    const { value: query } = e.target as HTMLInputElement;

    this.router.navigate([ "." ], {
      relativeTo: this.route,
      queryParams: { query },
    });
  }
}
