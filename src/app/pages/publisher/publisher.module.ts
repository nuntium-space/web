import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisherRoutingModule } from './publisher-routing.module';
import { PublisherComponent } from './publisher.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorsComponent } from './pages/authors/authors.component';
import { InviteAuthorComponent } from './pages/authors/invite/invite.component';
import { PublisherDetailsComponent } from './pages/details/details.component';
import { PublisherMenuComponent } from './components/menu/menu.component';
import { VerifyPublisherComponent } from './pages/verify/verify.component';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    PublisherComponent,
    AuthorsComponent,
    InviteAuthorComponent,
    PublisherDetailsComponent,
    PublisherMenuComponent,
    VerifyPublisherComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublisherRoutingModule,
  ],
  providers: [
    ApiService,
  ],
})
export class PublisherModule
{}
