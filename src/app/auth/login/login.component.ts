import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password
    }

    this.authService.login(loginRequest).subscribe(
      {
        next: () => {
          alert("Login successfull");
          this.router.navigate(['/home']);
        },
        error(err) {
          console.error("Couldn't log in, reason", err);
        },
      }
    );
  }
}
