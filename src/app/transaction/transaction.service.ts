import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { Account } from '../accounts/account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = `${environment.apiUrl}/api/transactions`

  constructor(private httpClient: HttpClient) { }

  performTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${this.apiUrl}/transfer`, transaction);
  }

  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`);
  }
}

export interface TransactionRequest {
	fromAccountId: number;
	toAccountId: number;
	amount: number;
	description: string;
}

export interface Transaction extends TransactionRequest {
  transactionId: number,
  transactionType: TransactionType,
  fromAccount: Account,
  toAccount: Account
  transactionDate: Date
}

export enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    TRANSFER = "TRANSFER"
}

