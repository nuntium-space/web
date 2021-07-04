import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService, ILike } from '../../services/api/api.service';

@Component({
  selector: 'feeds-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent {
  public likes?: ILike[];

  constructor(private api: ApiService, private auth: AuthService) {}

  public ngOnInit() {
    if (!this.auth.user) {
      return;
    }

    this.api.listLikes(this.auth.user).then((response) => {
      this.likes = response.data;
    });
  }
}
