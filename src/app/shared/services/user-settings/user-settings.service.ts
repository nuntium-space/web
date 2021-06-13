import { Injectable } from '@angular/core';
import { IUserSettings, ApiService } from 'src/app/services/api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService
{
  public userSettings?: IUserSettings;

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async init(): Promise<IUserSettings | null>
  {
    if (!this.auth.user)
    {
      return null;
    }

    const response = await this.api.retrieveUserSettings(this.auth.user.id);

    this.userSettings = response.data;

    return this.userSettings ?? null;
  }
}
