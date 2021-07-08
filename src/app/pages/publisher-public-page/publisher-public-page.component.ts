import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'src/config/Config';
import { IArticle, IBundle, IPublisher } from '../../services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-publisher-public-page',
  templateUrl: './publisher-public-page.component.html',
  styleUrls: ['./publisher-public-page.component.scss'],
})
export class PublisherPublicPageComponent implements OnInit {
  public isSubscribed = true;

  public publisher?: IPublisher;

  public articles?: IArticle[];

  public bundles?: IBundle[];

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  public ngOnInit() {
    this.route.params.subscribe({
      next: ({ id }) => {
        if (typeof id === 'string' && id.startsWith('pub_')) {
          this.api.retrievePublisher(id).then((response) => {
            if (response.success) {
              this.publisher = response.data;

              this.title.setTitle(
                `${this.publisher.name}${Config.PAGE_TITLE_SUFFIX}`
              );
            }
          });

          this.loadData(id);
        } else {
          this.api.retrievePublisherWithName(id).then((response) => {
            if (response.success) {
              this.publisher = response.data;

              this.loadData(this.publisher.id);

              this.title.setTitle(
                `${this.publisher.name}${Config.PAGE_TITLE_SUFFIX}`
              );
            }
          });
        }
      },
    });
  }

  private loadData(id: string): void {
    this.api.listArticlesForPublisher(id).then((response) => {
      // Payment Required
      if (response.status === 402) {
        this.articles = response.raw;

        this.isSubscribed = false;

        return;
      }

      this.articles = response.data;
    });

    this.api.listBundlesForPublisher(id).then((response) => {
      this.bundles = response.data;
    });
  }
}
