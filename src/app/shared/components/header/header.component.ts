import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
  public searchForm = new FormGroup({
    query: new FormControl(),
  });

  constructor(public auth: AuthService, public router: Router, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.queryParams.subscribe({
      next: queryParams =>
      {
        const query = (queryParams.query as string | undefined) ?? "";

        this.searchForm.get("query")?.setValue(query.trim());
      },
    });
  }

  public onSearchSubmit(e: Event)
  {
    e.preventDefault();

    this.router.navigate([ "explore" ], {
      queryParams: {
        query: this.searchForm.get("query")?.value ?? "",
      },
    });
  }
}
