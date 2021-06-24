import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [
    SignInComponent,
    ButtonsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SignInRoutingModule,
  ],
})
export class SignInModule
{}
