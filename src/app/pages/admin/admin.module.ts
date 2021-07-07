import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { DraftsComponent } from './pages/drafts/drafts.component';
import { ApiService } from './services/api/api.service';
import { ReportsComponent } from './pages/reports/reports.component';

@NgModule({
  declarations: [AdminComponent, MenuComponent, DraftsComponent, ReportsComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
  providers: [ApiService],
})
export class AdminModule {}
