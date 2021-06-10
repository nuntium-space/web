import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user?: IUser;

  constructor(private api: ApiService, private router: Router)
  {}

  public async init(): Promise<IUser | null>
  {
    const response = await this.api.retrieveCurrentSession();

    this.user = response.data?.user;

    return this.user ?? null;
  }

  public async signOut(): Promise<void>
  {
    await this.api.deleteCurrentSession();

    this.user = undefined;

    this.router.navigateByUrl("/");
  }
}
