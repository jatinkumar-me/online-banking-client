import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  phoneNumber: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const registerRequestBody: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      phoneNumber: this.phoneNumber
    }

    this.authService.register(registerRequestBody).subscribe({
      next: () => {
        alert("User created successfully");
        this.router.navigate(['/login']);
      },
      error(error) {
        console.error("Failed to create user reason", error)
      }
    })
  }

}
