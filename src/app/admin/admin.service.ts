import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../accounts/account.service';
import { User } from '../auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  /**
   * Account methods
  */

  public getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.apiUrl}/api/accounts/all`);
  }

  public deleteAccounts(accountId: number): Observable<Object> {
    return this.httpClient.delete(`${this.apiUrl}/api/accounts/${accountId}`);
  }

  public updateBalance(accountId: number, newBalance: number): Observable<Account> {
    return this.httpClient.put<Account>(
      `${this.apiUrl}/api/accounts/${accountId}/update-balance?newBalance=${newBalance}`, {});
  }

  /**
   * User methods
  */

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users/all`);
  }

  public deleteUser(userId: number): Observable<Object> {
    return this.httpClient.delete(`${this.apiUrl}/${userId}`);
  }

}
