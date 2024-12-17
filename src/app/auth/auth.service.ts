import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, User } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';
  private userKey = 'currentUser';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = this.loadStoredUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post<LoginResponse>(loginUrl, loginRequest).pipe(
      tap((response: LoginResponse) => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.storeUser(response.user);  // Store user data
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(registerRequest: RegisterRequest): Observable<User> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<User>(registerUrl, registerRequest);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private storeUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private loadStoredUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  private removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  isAdmin(): boolean {
    if (!this.getCurrentUser()) {
      return false;
    }
    return this.getCurrentUser()?.role === "ADMIN";
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
