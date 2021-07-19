import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser, ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: IUser;

  constructor(
    private api: ApiService,
    private cookie: CookieService,
    private router: Router
  ) {}

  public async init(): Promise<IUser | null> {
    if (!this.cookie.check('is_signed_in')) {
      return null;
    }

    const response = await this.api.retrieveCurrentSession();

    if (response.success) {
      this.user = response.data.user;
    }

    return this.user ?? null;
  }

  public async signOut(): Promise<void> {
    await this.api.deleteCurrentSession();

    this.user = undefined;

    this.router.navigateByUrl('/');
  }
}
