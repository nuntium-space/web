import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IUser } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user?: IUser;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async init(): Promise<IUser | null>
  {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.get("session_id"))
    {
      this.router.navigate([ "." ], {
        relativeTo: this.route,
      });
    }

    const sessionId = queryParams.get("session_id") ?? localStorage.getItem("session.id");

    if (!sessionId)
    {
      return null;
    }

    localStorage.setItem("session.id", sessionId);

    const response = await this.api.retrieveSession(sessionId);

    this.user = response.data?.user;

    return this.user ?? null;
  }

  public async signOut(): Promise<void>
  {
    const sessionId = localStorage.getItem("session.id");

    if (sessionId)
    {
      await this.api.deleteSession(sessionId);

      this.user = undefined;

      localStorage.clear();

      this.router.navigateByUrl("/");
    }
  }
}
