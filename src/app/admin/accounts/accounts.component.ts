import { Component } from '@angular/core';
import { Account } from '../../accounts/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  accounts: Account[] = [];
  updateForm: FormGroup;
  updatedBalances: { [key: number]: number } = {};
  selectedAccountId: number | null = null;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      newBalance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.adminService.getAllAccounts().subscribe(
      {
        next: (accounts) => { this.accounts = accounts },
        error: (error) => { console.error("error loading accounts", error) }
      }
    );
  }

  deleteAccount(accountId: number): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.adminService.deleteAccounts(accountId).subscribe(
        {
          next: () => {
            alert("Account deleted successfully");
            this.loadAccounts();
          },
          error: (error) => {
            console.error("Error deleting accounts", error);
          }
        }
      );
    }
  }

  onSelectAccount(accountId: number): void {
    this.selectedAccountId = accountId;
    this.updateForm.reset();
  }

  updateBalance(accountId: number): void {
    const newBalance = this.updatedBalances[accountId];

    if (newBalance == null || newBalance < 0) {
      alert("Please enter a valid balance.");
      return;
    }

    this.adminService.updateBalance(accountId, newBalance).subscribe(() => {
      alert("Balance updated successfully.");
      this.loadAccounts();
      this.updatedBalances[accountId] = 0; // Reset the input
    });
  }
}
