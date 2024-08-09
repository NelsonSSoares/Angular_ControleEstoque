import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    //Primeng
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    ChartModule,
    //Custom
    SharedModule
  ],
  providers: [
    CookieService,
    MessageService
  ],
})
export class DashboardModule { }
