import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountListComponent } from './account-list/account-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountFormComponent } from './account-form/account-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountListComponent,
    AccountFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountListComponent,
    AccountFormComponent
  ]
})
export class AccountsModule { }
