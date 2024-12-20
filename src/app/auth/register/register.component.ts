import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  address = '';
  phoneNumber = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registerForm: any) {
    if (registerForm.invalid) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const registerRequestBody: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      phoneNumber: this.phoneNumber
    };

    this.authService.register(registerRequestBody).subscribe({
      next: () => {
        alert("User created successfully");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Failed to create user. Reason:", error);
        alert("Registration failed.");
      }
    });
  }
}
