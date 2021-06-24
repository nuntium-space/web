import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisherPublicPageRoutingModule } from './publisher-public-page-routing.module';
import { PublisherPublicPageComponent } from './publisher-public-page.component';
import { WriteNewArticleComponent } from './pages/new/new.component';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './services/api/api.service';
import { DraftsComponent } from './pages/drafts/drafts.component';

@NgModule({
  declarations: [
    PublisherPublicPageComponent,
    WriteNewArticleComponent,
    DraftsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublisherPublicPageRoutingModule
  ],
  providers: [
    ApiService,
  ],
})
export class PublisherPublicPageModule
{}
