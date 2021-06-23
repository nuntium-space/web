import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraftRoutingModule } from './draft-routing.module';
import { DraftComponent } from './draft.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DraftComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DraftRoutingModule,
  ],
})
export class DraftModule
{}
