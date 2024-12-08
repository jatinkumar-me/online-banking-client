import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';



@NgModule({
  declarations: [
    TransactionFormComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TransactionFormComponent
  ]
})
export class TransactionModule { }
