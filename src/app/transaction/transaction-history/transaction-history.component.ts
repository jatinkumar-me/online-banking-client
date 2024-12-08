import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../transaction.service';
import { Account, AccountService } from '../../accounts/account.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  selectedAccountId: number | null = null;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (data) => (this.accounts = data),
      error: (err) => console.error('Error loading accounts', err),
    });
  }

  loadTransactionHistory(): void {
    if (this.selectedAccountId) {
      this.transactionService.getTransactionsByAccountId(this.selectedAccountId).subscribe({
        next: (data) => (this.transactions = data),
        error: (err) => console.error('Error loading transactions', err),
      });
    } else {
      this.transactions = [];
    }
  }
}
