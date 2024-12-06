import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}/api/accounts`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAccount(accountId: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.apiUrl}/${accountId}`);
  }

  getUserAccounts(): Observable<Account[]> {
    const userId = this.authService.getCurrentUser()?.userId;
    if (!userId) {
      console.error("user not logged in");
    }
    return this.httpClient.get<Account[]>(`${this.apiUrl}/user/${userId}`);
  }

  createNewAccount(createAccountDao: CreateAccountDao): Observable<Account> {
    return this.httpClient.post<Account>(`${this.apiUrl}/create`, createAccountDao);
  }
}

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT',
}

export interface CreateAccountDao {
  userId: number,
  accountType: AccountType
}

export interface Account extends CreateAccountDao {
  accountId: number;
  balance: number;
  accountNumber: string;
  createdAt: string;
  updatedAt?: string;
}
