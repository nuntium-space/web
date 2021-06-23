import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraftRoutingModule } from './draft-routing.module';
import { DraftComponent } from './draft.component';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    DraftComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DraftRoutingModule,
  ],
  providers: [
    ApiService,
  ],
})
export class DraftModule
{}
