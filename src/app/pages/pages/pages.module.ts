import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ForPublishersComponent } from './for-publishers/for-publishers.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ForPublishersComponent],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
})
export class PagesModule {}
