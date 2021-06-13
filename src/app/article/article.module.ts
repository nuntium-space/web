import { NgModule } from '@angular/core';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AddCommentFormComponent } from './components/add-comment-form/add-comment-form.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    ArticleComponent,
    AddCommentFormComponent,
    CommentListComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
