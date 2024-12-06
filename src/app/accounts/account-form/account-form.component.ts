import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, AccountService, CreateAccountDao } from '../account.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {
  accountForm!: FormGroup;

  @Output() accountCreated = new EventEmitter<Account>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountType: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const createAccountDao: CreateAccountDao = {
        userId: this.authService.getCurrentUser()!.userId,
        accountType: this.accountForm.value.accountType,
      };
      this.accountService.createNewAccount(createAccountDao).subscribe({
        next: (newAccount) => {
          alert("Account created successfully");
          this.accountCreated.emit(newAccount);
        },
        error: (err) => {
          console.error("Failed to create account", err);
        }
      })
      this.accountForm.reset();
    }
  }
}
