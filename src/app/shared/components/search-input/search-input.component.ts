import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shared-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit
{
  public searchForm = new FormGroup({
    query: new FormControl(),
  });

  constructor(public router: Router, private route: ActivatedRoute)
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
