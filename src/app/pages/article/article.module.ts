import { NgModule } from '@angular/core';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api/api.service';
import { BottomActionsComponent } from './components/bottom-actions/bottom-actions.component';

@NgModule({
  declarations: [
    ArticleComponent,
    BottomActionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticleRoutingModule
  ],
  providers: [
    ApiService,
  ],
})
export class ArticleModule { }
