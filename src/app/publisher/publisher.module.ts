import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisherRoutingModule } from './publisher-routing.module';
import { PublisherComponent } from './publisher.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorsComponent } from './authors/authors.component';
import { InviteAuthorComponent } from './authors/invite/invite.component';
import { PublisherDetailsComponent } from './details/details.component';
import { PublisherMenuComponent } from './menu/menu.component';
import { VerifyPublisherComponent } from './verify/verify.component';


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
    PublisherRoutingModule
  ]
})
export class PublisherModule { }
