import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForPublishersComponent } from './pages/for-publishers/for-publishers.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';

@NgModule({
  declarations: [ForPublishersComponent, PrivacyComponent, TermsComponent],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
})
export class PagesModule {}
