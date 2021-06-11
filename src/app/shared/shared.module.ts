import { A11yModule } from "@angular/cdk/a11y";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationLoader } from '../miscellaneous/TranslationLoader';
import { HeaderComponent } from './components/header/header.component';
import { DangerButtonComponent } from './components/danger-button/danger-button.component';
import { BadgeComponent } from './components/badge/badge.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { KeepHtmlPipe } from './pipes/keep-html/keep-html.pipe';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';
import { FormComponent } from './components/form/form.component';

export const createTranslationLoader = (http: HttpClient) =>
{
  return new TranslationLoader(http);
}

@NgModule({
  declarations: [
    /*
      COMPONENTS
    */
    HeaderComponent,
    DangerButtonComponent,
    BadgeComponent,
    FooterComponent,
    SpinnerComponent,
    DialogComponent,
    PopupMenuComponent,
    FormComponent,

    /*
      PIPES
    */
    KeepHtmlPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    A11yModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslationLoader),
        deps: [ HttpClient ],
      },
      defaultLanguage: "en",
      isolate: false,
    }),
  ],
  exports: [
    /*
      MODULES
    */
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,

    /*
      COMPONENTS
    */
    HeaderComponent,
    DangerButtonComponent,
    BadgeComponent,
    FooterComponent,
    SpinnerComponent,
    PopupMenuComponent,
    FormComponent,

    /*
      PIPES
    */
    KeepHtmlPipe,
  ],
})
export class SharedModule { }
