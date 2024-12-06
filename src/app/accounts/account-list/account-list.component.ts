import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from '../account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {

  accounts: Account[] = [];
  selectedAccount?: Account;
  showAccountForm = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error("Couldn't fetch user accounts", err);
      }
    })
  }

  toggleAccountForm() {
    this.showAccountForm = !this.showAccountForm;
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
  }

}
