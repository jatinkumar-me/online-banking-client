import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction, TransactionService } from '../transaction.service';
import { Account, AccountService } from '../../accounts/account.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup;
  accounts: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (data) => (this.accounts = data),
      error: (err) => console.error('Error loading accounts', err),
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.transactionService.performTransaction(this.transactionForm.value).subscribe({
        next: (_transaction: Transaction) => {
          alert('Transaction successful!');
          this.transactionForm.reset();
        },
        error: (err) => alert('Error: ' + err.message)
      });
    }
  }
}
