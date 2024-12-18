import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AuthGuard } from './auth/auth.guard';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionHistoryComponent } from './transaction/transaction-history/transaction-history.component';
import { AdminGuard } from './auth/admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'accounts', component: AccountListComponent, canActivate: [AuthGuard] },
      { path: 'transfer', component: TransactionFormComponent, canActivate: [AuthGuard] },
      { path: 'transactions', component: TransactionHistoryComponent, canActivate: [AuthGuard] },
      {
        path: 'admin', component: DashboardComponent, canActivate: [AdminGuard],
        children: [
          { path: 'accounts', component: AccountsComponent },
          { path: 'users', component: UsersComponent },
          { path: '**', redirectTo: 'accounts' }
        ]
      },
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
