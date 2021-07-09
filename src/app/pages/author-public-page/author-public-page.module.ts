import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorPublicPageRoutingModule } from './author-public-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorPublicPageComponent } from './author-public-page.component';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [AuthorPublicPageComponent],
  imports: [CommonModule, SharedModule, AuthorPublicPageRoutingModule],
  providers: [ApiService],
})
export class AuthorPublicPageModule {}
