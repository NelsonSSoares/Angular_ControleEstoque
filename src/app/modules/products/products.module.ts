import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SharedModule, HttpClientModule,
    //primeng imports
    CardModule, ButtonModule, TableModule, InputMaskModule, InputSwitchModule, 
    InputTextModule, InputTextareaModule, InputNumberModule, DynamicDialogModule,
    ConfirmDialogModule, TooltipModule
  ]
})
export class ProductsModule { }
