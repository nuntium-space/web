import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
})
export class AdminModule
{}
