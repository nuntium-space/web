import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent
{
  @Output()
  public search = new EventEmitter<string>();

  public showNav = false;

  constructor(public auth: AuthService, public router: Router)
  {}

  public onSearch(e: Event)
  {
    const input = e.target as HTMLInputElement;

    this.search.emit(input.value);
  }
}
